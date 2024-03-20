import asyncio
import json
import signal
import time  # Import time module to track elapsed time
from bleak import BleakClient

# Configuration
NUS_SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e"
NUS_RX_CHARACTERISTIC_UUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e"
device_mac_address = "FC:9C:F9:99:E6:60"  # Replace with your device's MAC address

data = []  # This will store the collected data points
byte_count = 0  # Initialize a counter for received bytes
start_time = None  # Time when data collection starts

def handle_data(sender, value):
    """Handle received data."""
    global byte_count, start_time
    byte_count += len(value)  # Increment the byte count by the length of the received value
    print(f"Received data from {sender}: {value}, Total bytes received: {byte_count}")

    if start_time is None:
        start_time = time.time()  # Record the start time when the first data is received

    decoded_value = value.decode("utf-8", errors="ignore")  # Attempt to decode as UTF-8, ignore errors
    data.append(decoded_value)

async def connect_and_listen_to_device(device_mac_address):
    global start_time
    async with BleakClient(device_mac_address) as client:
        if await client.is_connected():
            print(f"Connected to the device with MAC address: {device_mac_address}")

            await client.start_notify(NUS_RX_CHARACTERISTIC_UUID, handle_data)
            print("Subscribed to notifications. Listening for data...")

            # Keep the script running to listen for data
            await asyncio.sleep(float("inf"))
        else:
            print("Failed to connect to the device.")

def output_data_to_json(data):
    """Output any received data to output_data.json."""
    with open("output_data.json", "w") as f:
        json.dump(data, f)

def calculate_bytes_per_second():
    """Calculate and print the number of bytes received per second."""
    elapsed_time = time.time() - start_time
    if elapsed_time > 0:  # Prevent division by zero
        bytes_per_second = byte_count / elapsed_time
        print(f"Total bytes received: {byte_count}, Elapsed time: {elapsed_time} seconds, Bytes per second: {bytes_per_second}")

def signal_handler(sig, frame):
    """End program on CTRL+C."""
    print("Stopping...")
    calculate_bytes_per_second()  # Calculate bytes per second before exiting
    output_data_to_json(data)
    print("Data output to output_data.json")
    loop.stop()

if __name__ == "__main__":
    # Setup signal handler for graceful exit
    signal.signal(signal.SIGINT, signal_handler)

    loop = asyncio.get_event_loop()
    loop.run_until_complete(connect_and_listen_to_device(device_mac_address))
