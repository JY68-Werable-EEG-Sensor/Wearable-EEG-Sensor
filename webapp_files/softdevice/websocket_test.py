import socketio
import time
import random

# Configuration
server_url = "http://localhost:4000"  # WebSocket server URL
interval_seconds = 1  # How often to send data (in seconds)

# Initialize Socket.IO client
sio = socketio.Client()

@sio.event
def connect():
    print("Connected to the WebSocket server.")

@sio.event
def disconnect():
    print("Disconnected from the WebSocket server.")

def send_random_data():
    """Send random data to the WebSocket server at regular intervals."""
    while True:
        # Generate random data
        random_data = {'value': random.randint(0, 100)}
        
        # Emit data to the server
        sio.emit('sendEEGData', random_data)
        print(f"Sent: {random_data}")
        
        # Wait before sending the next piece of data
        time.sleep(interval_seconds)

if __name__ == "__main__":
    try:
        sio.connect(server_url)
        
        # Start sending random data
        send_random_data()
    except KeyboardInterrupt:
        print("Program terminated by user.")
        sio.disconnect()
    except Exception as e:
        print(f"An error occurred: {e}")
