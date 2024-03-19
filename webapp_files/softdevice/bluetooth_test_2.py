from adafruit_ble import BLERadio
from adafruit_ble.advertising.standard import ProvideServicesAdvertisement
from adafruit_ble.services.nordic import UARTService

ble = BLERadio()
uart_connection = None

# Attempt to connect to the UART service
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

    while uart_connection.connected:
        if uart_service.in_waiting:
            new_data_buffer = uart_service.readline().decode('utf-8').strip()
            data_pairs = new_data_buffer.split(' ')  # Assuming space is the correct delimiter

            for pair in data_pairs:
                if ":" in pair:  # Validate format
                    try:
                        count, value = pair.split(":")
                        count = int(count)  # Convert count to integer

                        # Check for consecutive counts, adjust logic as needed
                        if prev_count == -1:  # For the first valid pair
                            print(pair)  # Print the first pair without checking
                        elif count == prev_count + 1:
                            print(pair)  # Consecutive, print normally
                        else:
                            # Non-consecutive, flag it
                            print(f"Non-consecutive count detected: {pair}")

                        prev_count = count  # Update prev_count for the next iteration

                    except ValueError:
                        # Handle potential conversion errors
                        print(f"Error processing data pair '{pair}': invalid format")

else:
    print("Failed to connect.")
