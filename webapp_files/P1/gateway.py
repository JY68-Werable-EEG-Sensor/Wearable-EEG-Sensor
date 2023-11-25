import boto3
import json
# temporary random dict
# to be replaced with bluetooth data
import random

def generate_random_dict(size):
    random_dict= {}

    for i in range(size):
        key = i
        voltage = round(random.uniform(-3.3, 3.3), 3)
        random_dict[key] = voltage;

    return random_dict

# create S3 client
s3 = boto3.client("s3")

# dictionary
my_data = generate_random_dict(10)

my_data_json_str = json.dumps(my_data)

print(json.dumps(my_data))

s3.put_object(
    Bucket="eeg-data-capstone",
    Key="object_name.json",
    Body=my_data_json_str,
)