import asyncio
from bleak import BleakClient

# Configuration
NUS_SERVICE_UUID = "6e400001-b5a3-f393-e0a9-e50e24dcca9e"
NUS_TX_CHARACTERISTIC_UUID = "6e400002-b5a3-f393-e0a9-e50e24dcca9e"
NUS_RX_CHARACTERISTIC_UUID = "6e400003-b5a3-f393-e0a9-e50e24dcca9e"
device_mac_address = "FC:9C:F9:99:E6:60"  # Change this to your device's MAC address

async def handle_data(sender, data):
    """Handle received data."""
    print(f"Data received: {data}")

async def send_command(client, command):
    """Send a command to the device, ensuring the client is connected."""
    if not client.is_connected:
        print("Client not connected, attempting to reconnect...")
        await client.connect()
        await client.start_notify(NUS_RX_CHARACTERISTIC_UUID, handle_data)
        print("Reconnected and started notification.")
    await client.write_gatt_char(NUS_TX_CHARACTERISTIC_UUID, command.encode())
    print(f"Command sent: {command}")

async def user_input(client):
    """Handle user input, ensuring commands are sent to the device."""
    while True:
        command = await asyncio.get_event_loop().run_in_executor(None, input, "Enter 'START' or 'STOP': ")
        if command.upper() in ["START", "STOP"]:
            await send_command(client, command.upper())

async def main(device_mac_address):
    """Main function to manage device connection and user interaction."""
    client = BleakClient(device_mac_address)
    try:
        await client.connect()
        client.set_disconnected_callback(lambda c: print(f"Client {c.address} disconnected. Attempting to reconnect..."))
        await client.start_notify(NUS_RX_CHARACTERISTIC_UUID, handle_data)
        print("Connected and started notification.")
        
        await user_input(client)
    finally:
        await client.disconnect()
        print("Disconnected.")

if __name__ == "__main__":
    asyncio.run(main(device_mac_address))
