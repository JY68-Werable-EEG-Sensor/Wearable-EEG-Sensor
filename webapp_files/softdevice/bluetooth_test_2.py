from adafruit_ble import BLERadio
from adafruit_ble.advertising.standard import ProvideServicesAdvertisement
from adafruit_ble.services.nordic import UARTService
import matplotlib.pyplot as plt
from matplotlib.animation import FuncAnimation
import numpy as np

ble = BLERadio()
uart_connection = None

data = []  # This will store the collected data points
WINDOW_SIZE = 50  # Number of data points to display on the plot at any time

# Attempt to connect to the UART service
if not uart_connection:
    print("Trying to connect...")
    for adv in ble.start_scan(ProvideServicesAdvertisement, timeout=5):
        if UARTService in adv.services:
            uart_connection = ble.connect(adv)
            print("Connected")
            break
    ble.stop_scan()

if uart_connection and uart_connection.connected:
    uart_service = uart_connection[UARTService]
    print("Listening for data...")

    prev_count = -1  # Initialize to an impossible value for the first check

    def print_and_update_plot(new_data_buffer):
        global data, prev_count
        for pair in new_data_buffer.split():
            if ":" in pair:  # Validate format
                try:
                    count, value = map(int, pair.split(":"))
                    
                    # Check for consecutive counts, adjust logic as needed
                    if prev_count == -1:  # For the first valid pair
                        print(pair)  # Print the first pair without checking
                    elif count == prev_count + 1:
                        print(pair)  # Consecutive, print normally
                    else:
                        # Non-consecutive, flag it
                        print(f"Non-consecutive count detected: {pair}")

                    prev_count = count  # Update prev_count for the next iteration

                    # Append valid sample_count and sample_value
                    data.append(value)
                    
                    # Keep only the latest WINDOW_SIZE data points
                    if len(data) > WINDOW_SIZE:
                        data = data[-WINDOW_SIZE:]

                    x_values = range(len(data))
                    sc.set_offsets(np.c_[x_values, data])  # Efficiently update scatter plot data
                except ValueError as e:
                    print(f"Error processing data pair '{pair}': {e}")
    
    # Initialize plot
    fig, ax = plt.subplots()
    sc = ax.scatter([], [], label="Sampled Data")  # Initialize an empty scatter plot
    ax.legend(loc="upper left")
    ax.set_ylim([0, 4095])  # Adjust this as per your data range
    ax.set_xlim(0, WINDOW_SIZE - 1)
    ax.set_xlabel("Sample Number")
    ax.set_ylabel("Value")

    def init():
        return sc,

    def update_plot(frame):
        global data
        if uart_service.in_waiting:
            # Read new data buffer from UART
            new_data_buffer = uart_service.readline().decode('utf-8').strip()
            print_and_update_plot(new_data_buffer)
    
        return sc,

    # Use FuncAnimation to update the plot
    ani = FuncAnimation(fig, update_plot, init_func=init, interval=100, blit=True)

    plt.show()

else:
    print("Failed to connect.")
