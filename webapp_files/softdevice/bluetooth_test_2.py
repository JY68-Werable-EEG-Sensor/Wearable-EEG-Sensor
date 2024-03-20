import signal
import json
from adafruit_ble import BLERadio
from adafruit_ble.advertising.standard import ProvideServicesAdvertisement
from adafruit_ble.services.nordic import UARTService
import time

ble = BLERadio()
uart_connection = None
data = []  # This will store the collected data points

def signal_handler(sig, frame):
    """
    End program on CTRL+C.
    """
    print('Stopping...')
    if uart_connection and uart_connection.connected:
        uart_connection.disconnect()
    output_data_to_json(data)
    print('Data output to output_data.json')

def output_data_to_json(data):
    """
    Output any received data to output_data.json.
    """
    with open('output_data.json', 'w') as f:
        for item in data:
            json.dump(item, f)
            f.write('\n')  # Write a newline character after each item

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

    while True:
        if uart_service.in_waiting:
            # Read new data buffer from UART
            new_data_buffer = uart_service.readline()
            print(new_data_buffer)
            print(f"Received packet of length: {len(new_data_buffer)}")
            data.append(new_data_buffer.decode('utf-8').strip())  # Decode and strip newline/whitespace
else:
    print("Failed to connect.")
