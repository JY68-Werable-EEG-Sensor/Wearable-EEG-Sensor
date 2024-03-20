import asyncio
import threading
from bleak import BleakClient
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
import time

# Configuration
NUS_SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e"
NUS_RX_CHARACTERISTIC_UUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e"
device_mac_address = "FC:9C:F9:99:E6:60"  # Replace with your device's MAC address

data = []  # This will store the collected data points
sample_count = 0  # Counts the number of samples received
last_time = time.time()

def handle_data(sender, value):
    """Handle received data."""
    global data, sample_count, last_time

    # Convert bytes to 16-bit integers (assuming little-endian)
    values = [int.from_bytes(value[i:i+2], byteorder='little', signed=True) for i in range(0, len(value), 2)]
    data.extend(values)
    # print(values)
    sample_count += len(values)

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

def plot_data():
    WINDOW_SIZE = 50  # Number of samples to display
    fig, ax = plt.subplots()
    ax.set_ylim(0, 5000)  # Set the y-axis range

    xdata = list(range(WINDOW_SIZE))
    ydata = [0] * WINDOW_SIZE
    ln, = plt.plot([], [], 's')

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

def main():
    # Start BLE event loop in a separate thread
    def run_ble():
        asyncio.run(connect_and_listen_to_device(device_mac_address))

    ble_thread = threading.Thread(target=run_ble, daemon=True)
    ble_thread.start()

    # Start plotting on the main thread
    plot_data()

if __name__ == "__main__":
    main()
