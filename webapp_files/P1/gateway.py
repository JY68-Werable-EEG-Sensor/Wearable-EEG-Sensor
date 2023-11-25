import boto3
import json

# create S3 client
s3 = boto3.client("s3")

# dictionary
my_data = {
    'text': {
        "text1": "hello",
        "text2": "world",
        "text3": "test aws s3",
    },
    'user': {
        'name': "chris",
        'time': '10'
    }
}
my_data_json_str = json.dumps(my_data)

print(json.dumps(my_data))

s3.put_object(
    Bucket="eeg-data-capstone",
    Key="object_name.json",
    Body=my_data_json_str,
)