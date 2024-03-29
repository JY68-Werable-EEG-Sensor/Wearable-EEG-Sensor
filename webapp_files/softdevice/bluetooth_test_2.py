import asyncio
import json
import signal
import threading
from bleak import BleakClient
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
import time

import socketio
from queue import Queue

# Configuration
NUS_SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e"
NUS_RX_CHARACTERISTIC_UUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e"
device_mac_address = "FC:9C:F9:99:E6:60"  # Replace with your device's MAC address

# Initialize Socket.IO
sio = socketio.Client(logger=True, engineio_logger=True)
# WebSocket server's URL
server_url = "http://localhost:4000"

data = []  # This will store the collected data points
sample_count = 0  # Counts the number of samples received
last_time = time.time()

# Set up queue for data
data_queue = Queue()
MAX_QUEUE_SIZE = 1000

from scipy.signal import iirnotch, butter, lfilter, lfilter_zi
 
# Configuration for Notch Filter
fs = 1000  # Sampling frequency
f0 = 60  # Frequency to be removed from signal (Hz)
quality_factor = 5  # Quality factor for notch filter

# Design Notch Filter
b_notch, a_notch = iirnotch(f0, quality_factor, fs)
zi_notch = lfilter_zi(b_notch, a_notch) * 0  # Initial state of the notch filter

# Configuration for Low-pass Filter
cutoff = 100  # Desired cutoff frequency of the low-pass filter, Hz
order = 6  # Filter order

# Design Low-pass Filter
b_low, a_low = butter(order, cutoff / (0.5 * fs), btype='low', analog=False)
zi_low = lfilter_zi(b_low, a_low) * 0  # Initial state of the low-pass filter

# Additional configuration for High-pass Filter
hp_cutoff = 0.5  # Desired cutoff frequency of the high-pass filter, Hz
hp_order = 6  # Filter order for the high-pass filter

# Design High-pass Filter
b_hp, a_hp = butter(hp_order, hp_cutoff / (0.5 * fs), btype='high', analog=False)
zi_hp = lfilter_zi(b_hp, a_hp) * 0  # Initial state of the high-pass filter

def handle_data(sender, value):
    """Handle received data."""
    global data, sample_count, last_time, zi_notch, zi_low, zi_hp
    OFFSET = 0

    # Convert bytes to 16-bit integers (assuming little-endian)
    values = [int.from_bytes(value[i:i+2], byteorder='little', signed=True) for i in range(0, len(value), 2)]

    # Apply the high-pass filter
    # filtered_hp, zi_hp = lfilter(b_hp, a_hp, values, zi=zi_hp)

     # Apply the notch filter
    filtered_notch, zi_notch = lfilter(b_notch, a_notch, values, zi=zi_notch)

    # Apply the low-pass filter to the output of the notch filter
    filtered_values, zi_low = lfilter(b_low, a_low, filtered_notch, zi=zi_low)

    filtered_values_offset = [filtered_values[i] + OFFSET for i in range(0, len(filtered_values))]
    data.extend(filtered_values_offset)
    sample_count += len(filtered_values_offset)

    for val in filtered_values_offset:
        # Make sure queue does not become too big
        if data_queue.qsize() >= MAX_QUEUE_SIZE:
            try:
                data_queue.get_nowait()
                data_queue.task_done()
            except data_queue.Empty:
                pass
        data_queue.put(val)
        #sio.emit('sendEEGData', {'value': val})
        #print(f"Sent: {val}")

    print(filtered_values_offset)

    # Calculate samples per second every second
    current_time = time.time()
    if current_time - last_time >= 1.0:  # Every second
        print(f"Samples per second: {sample_count}")
        sample_count = 0  # Reset the counter
        last_time = current_time


async def connect_and_listen_to_device(device_mac_address):
    async with BleakClient(device_mac_address) as client:
        if await client.is_connected():
            print(f"Connected to the device with MAC address: {device_mac_address}")
            await client.start_notify(NUS_RX_CHARACTERISTIC_UUID, handle_data)
            print("Subscribed to notifications. Listening for data...")
            await asyncio.sleep(float("inf"))  # Keep listening indefinitely
        else:
            print("Failed to connect to the device.")

def output_data_to_json(data):
    """Output any received data to output_data.json."""
    with open("output_data.json", "w") as f:
        json.dump(data, f)

def plot_data():
    WINDOW_SIZE = 500  # Number of samples to display
    fig, ax = plt.subplots()
    ax.set_ylim(0, 5000)  # Set the y-axis range

    xdata = list(range(WINDOW_SIZE))
    ydata = [0] * WINDOW_SIZE
    ln, = plt.plot([], [], 'r')

    def init():
        ax.set_xlim(0, WINDOW_SIZE - 1)
        ax.set_ylim(0, 5000)
        return ln,

    def update_plot(frame):
        if len(data) > WINDOW_SIZE:
            ydata = data[-WINDOW_SIZE:]
        else:
            ydata = [0]*(WINDOW_SIZE-len(data)) + data
        ln.set_data(xdata, ydata)
        return ln,

    ani = FuncAnimation(fig, update_plot, init_func=init, blit=True, interval=20)
    plt.show()

def signal_handler(sig, frame):
    """End program on CTRL+C."""
    print("Stopping...")
    sio.disconnect()
    print("Disconnected from server.")
    output_data_to_json(data)
    print("Data output to output_data.json")
    asyncio.get_event_loop().stop()  # Correct way to stop the loop

def connect_server():
    @sio.event
    def connect():
        print("Connected to the server.")

    @sio.event
    def connect_error(data):
        print("The connection failed!")

    @sio.event
    def disconnect():
        print("Disconnected from the server.")

    try:
        sio.connect(server_url)
        print("Attempting to connect to the server at ", server_url)
    except Exception as e:
        print("Failed to connect to server:", e)

def emit_data():
    # Send data in batches to reduce lag
    batch_size = 10;
    batch = []
    while True:
        val = data_queue.get()
        batch.append(val)
        if len(batch) >= batch_size:
            sio.emit('sendEEGData', {'value': val})
            batch = []
        data_queue.task_done()

# Correctly initiate and manage the main function
def main():
    # Connect to WebSocket server
    connect_server()

    emission_Thread = threading.Thread(target=emit_data, daemon=True)
    plotdata_Thread = threading.Thread(target=plot_data, daemon=True)

    emission_Thread.start()
    plotdata_Thread.start()
    # Plotting in a separate thread
    
    loop = asyncio.get_event_loop()
    # Assign the signal handler
    signal.signal(signal.SIGINT, signal_handler)
    
    # Start the BLE connection task
    loop.run_until_complete(connect_and_listen_to_device(device_mac_address))


if __name__ == "__main__":
    main()