# SPDX-FileCopyrightText: 2020 Dan Halbert for Adafruit Industries
#
# SPDX-License-Identifier: MIT

# Connect to an "eval()" service over BLE UART.

from adafruit_ble import BLERadio
from adafruit_ble.advertising.standard import ProvideServicesAdvertisement
from adafruit_ble.services.nordic import UARTService

import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
from datetime import datetime
import itertools

ble = BLERadio()

uart_connection = None

data = []  

if not uart_connection:
    print("Trying to connect...")
    for adv in ble.start_scan(ProvideServicesAdvertisement):
        if UARTService in adv.services:
            uart_connection = ble.connect(adv)
            print("Connected")
            break
    ble.stop_scan()

    if uart_connection and uart_connection.connected:
        uart_service = uart_connection[UARTService]

# def update_plot(frame):
#     # Assuming uart_service.readline() is non-blocking or called in a background thread
#     # and it returns a new data point every time.
#     new_data = uart_service.readline().decode('utf-8').strip()
#     if new_data:  # Make sure there's data
#         data.append(list(new_data))  # Convert string to float and append to the data list
    
#     plt.cla()  # Clear the current axes
#     plt.scatter(range(len(data)), data)  # Use scatter plot for individual points
#     # plt.xlim(0, window_size)  # Set x-axis limit to maintain window size
#     # Optionally, you can set a y-axis limit if you know the range of your data
#     # plt.ylim(min_value, max_value)
        

# Number of data points to display on the plot at any time
WINDOW_SIZE = 50

def update_plot(frame):
    # Read new data buffer from UART
    new_data_buffer = uart_service.readline().decode('utf-8').strip()
    
    # Convert the buffer into a list of data points and append to the data list
    if new_data_buffer:
        # Assume that new_data_buffer is a string of numbers separated by commas
        new_data = new_data_buffer.split(' ')
        print(new_data)
        print('\n')
        # Convert string numbers to floats and append as a new sublist
        data.append([float(i) for i in new_data])

    # Flatten the list of lists while keeping only the latest WINDOW_SIZE data points
    flat_data = list(itertools.chain.from_iterable(data[-WINDOW_SIZE:]))
    
    # Plot the data
    plt.cla()  # Clear the current axes
    plt.plot(range(len(flat_data)), flat_data)  # Plot the flattened data

    # Set the x-axis to span the window size
    # Here, we set the x-axis to show the last WINDOW_SIZE points
    plt.xlim(max(0, len(flat_data) - WINDOW_SIZE), len(flat_data))


# Set up the figure for plotting
plt.figure()

# Create an animation that updates the plot every second (1000 milliseconds)
ani = FuncAnimation(plt.gcf(), update_plot, interval=20)

# Show the plot
plt.show()


#     if uart_connection and uart_connection.connected:
#         uart_service = uart_connection[UARTService]
#         while uart_connection.connected:
#             # s = input("Send: ")
#             # uart_service.write(s.encode("utf-8"))
#             # uart_service.write(b'\n')
#             print("Reading:")
#             array = uart_service.readline().decode("utf-8")
#             # another = input("Another loop? Y or N \n")
#             # if (another == "N"):
#             #     exit()

#             plt.plot(list(array))
#             plt.show()

# import threading
# import queue
# import matplotlib.pyplot as plt
# from matplotlib.animation import FuncAnimation
# from adafruit_ble import BLERadio
# from adafruit_ble.advertising.standard import ProvideServicesAdvertisement
# from adafruit_ble.services.nordic import UARTService
# import itertools
# import time

# ble = BLERadio()
# uart_connection = None
# data_queue = queue.Queue()  # Thread-safe queue for data points

# # Try to establish UART connection
# if not uart_connection:
#     print("Trying to connect...")
#     for adv in ble.start_scan(ProvideServicesAdvertisement):
#         if UARTService in adv.services:
#             uart_connection = ble.connect(adv)
#             print("Connected")
#             break
#     ble.stop_scan()

# uart_service = uart_connection[UARTService] if uart_connection and uart_connection.connected else None

# # Thread function for reading data from UART
# def read_uart_data():
#     while uart_connection and uart_connection.connected:
#         new_data_buffer = uart_service.readline().decode('utf-8').strip()
#         if new_data_buffer:
#             # Place the new data in the queue
#             data_queue.put(new_data_buffer)
#         else:
#             # If no data, sleep for a short period to avoid busy waiting
#             time.sleep(0.01)

# # Function to update plot, called by Matplotlib's animation
# def update_plot(frame):
#     flat_data = []
#     while not data_queue.empty():
#         # Get the next available data from the queue
#         new_data_buffer = data_queue.get()
#         new_data = new_data_buffer.split(' ')  # Assuming space-separated values
#         # Update the data list with new data
#         data.append([float(i) for i in new_data])
#         # Make sure we only keep the latest WINDOW_SIZE data points
#         flat_data = list(itertools.chain.from_iterable(data[-WINDOW_SIZE:]))
#         print(flat_data)

#     # Clear the plot and plot new data
#     plt.cla()
#     plt.plot(range(len(flat_data)), flat_data)
#     plt.xlim(max(0, len(flat_data) - WINDOW_SIZE), len(flat_data))

# # Create and start the UART reading thread
# uart_thread = threading.Thread(target=read_uart_data, daemon=True)
# uart_thread.start()

# # Number of data points to display on the plot at any time
# WINDOW_SIZE = 50
# data = []  # Data storage

# # Set up the figure for plotting
# plt.figure()

# # Create an animation that updates the plot every 20 milliseconds
# ani = FuncAnimation(plt.gcf(), update_plot, interval=20)

# # Show the plot
# plt.show()


