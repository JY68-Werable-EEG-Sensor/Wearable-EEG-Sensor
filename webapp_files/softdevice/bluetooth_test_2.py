import signal
import json
from adafruit_ble import BLERadio
from adafruit_ble.advertising.standard import ProvideServicesAdvertisement
from adafruit_ble.services.nordic import UARTService
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
import numpy as np
import struct
import time

ble = BLERadio()
uart_connection = None
data = []  # This will store the collected data points
WINDOW_SIZE = 50  # Number of data points to display on the plot at any time

samples_received = 0  # Initialize sample count
start_time = time.time()  # Initialize start time

def signal_handler(sig, frame):
    """
    End program on CTRL+C
    """
    print('Stopping...')
    if uart_connection and uart_connection.connected:
        uart_connection.disconnect()
    output_data_to_json(data)
    plt.close('all')

def output_data_to_json(data):
    """
    Output any received data to output_data.json
    """
    with open('output_data.json', 'w') as f:
        for item in data:
            json.dump(item, f)
            f.write('\n')  # Write a newline character after each item
    print('Data output to output_data.json')

signal.signal(signal.SIGINT, signal_handler)

# Attempt to connect to the UART service
if not uart_connection:
    print("Trying to connect...")
    for adv in ble.start_scan(ProvideServicesAdvertisement, timeout=50):
        if UARTService in adv.services:
            uart_connection = ble.connect(adv)
            print("Connected")
            break
    ble.stop_scan()

if uart_connection and uart_connection.connected:
    uart_service = uart_connection[UARTService]
    print("Listening for data...")

    def update_data(new_data):
        """
        Unpack received binary data to integers and update plot data.
        """
        global data, samples_received, start_time
        # print(new_data)
        # print("\n")
        # Unpack binary data to integers ('H' format for uint16_t, assuming little-endian byte order)
        values = [int.from_bytes(new_data[i:i+2], 'big') for i in range(0, len(new_data), 2)]

        for value in values:
            data.append(value)  # Store values
            samples_received += 1  # Increment sample count
            # print(value)
        
        # Calculate elapsed time
        elapsed_time = time.time() - start_time
        if elapsed_time >= 1.0:  # If one second has passed
            samples_per_second = samples_received / elapsed_time
            print("Samples per second:", samples_per_second)
            # Reset count and time for the next interval
            samples_received = 0
            start_time = time.time()
        
        # Use only the latest WINDOW_SIZE data points for plotting
        if len(data) > WINDOW_SIZE:
            plot_data = data[-WINDOW_SIZE:]
        else:
            plot_data = data
        return plot_data

    # Initialise plot
    fig, ax = plt.subplots()
    sc = ax.scatter(range(WINDOW_SIZE), [0]*WINDOW_SIZE, label="Sampled Data")  # Scatter plot
    line, = ax.plot(range(WINDOW_SIZE), [0]*WINDOW_SIZE, '-o', color='blue', label='Line')  # Line plot
    ax.legend(loc="upper left")
    ax.set_ylim([0, 5000])  # Adjust this as per your data range
    ax.set_xlim(0, WINDOW_SIZE - 1)
    ax.set_xlabel("Sample Number")
    ax.set_ylabel("Value")

    def init():
        """
        Initialise plot
        """
        return sc, line,

    def update_plot(frame):
        """
        Updates plot
        """
        if uart_service.in_waiting:
            # Read new data buffer from UART
            new_data_buffer = uart_service.read(uart_service.in_waiting)
            plot_data = update_data(new_data_buffer)
            x_values = range(len(plot_data))
            y_values = plot_data
            sc.set_offsets(np.c_[x_values, y_values])  # Update scatter plot data
            line.set_data(x_values, y_values)  # Update line plot data
        return sc, line,

    # Use FuncAnimation to update the plot
    ani = FuncAnimation(fig, update_plot, init_func=init, interval=20, blit=True)

    plt.show()

else:
    print("Failed to connect.")
