from datetime import datetime
import os
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS
import random

# STANDARDISED: Pass CAN_ID and Message Position instead.
# Using different bucket! haltech_data_std

# Range: 10-100ms (output)
def generate_random_value():
    x = random.uniform(0, 10000)
    y = x / 100
    return y

def push_value(client: InfluxDBClient, can_id, position, value):
    write_api = client.write_api(write_options=SYNCHRONOUS)
    org = "demo_org"
    bucket = "haltech_data_std"
    
    point = Point(can_id) \
        .tag("position", position) \
        .field("value", value) \
        .time(datetime.utcnow(), WritePrecision.NS)
        
    write_api.write(bucket, org, point)
    return push_value

def pull_value(client, can_id, position):
    query_api = client.query_api()
    
    query = 'from(bucket: "haltech_data_std") \
        |> range(start: -1h) \
        |> filter(fn: (r) => r["_measurement"] == "' + str(can_id) + '") \
        |> filter(fn: (r) => r["position"] == "' + str(position) + '") \
        |> sort(columns: ["_time"], desc: true) \
        |> limit(n:1)'
        
    result = query_api.query(query, org="demo_org")
    duration = 0.0
    
    for table in result:
        for record in table.records:
            duration = record.get_value()
            print(f"Position {record.values.get('position')}: Value={record.get_value()}")
            
    return duration