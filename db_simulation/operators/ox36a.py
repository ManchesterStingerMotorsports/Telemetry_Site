from datetime import datetime
import os
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS
import random

# CAN 0x36a: Knock Level 1-2 Volume (dB)

# Range: 10-100ms (output)
def generate_random_value():
    x = random.uniform(0, 10000)
    y = x / 100
    return y

def push_value(client: InfluxDBClient, level):
    write_api = client.write_api(write_options=SYNCHRONOUS)
    org = "demo_org"
    bucket = "haltech_data"
    push_value = generate_random_value()
    
    point = Point("knock_level") \
        .tag("level", level) \
        .field("volume", push_value) \
        .time(datetime.utcnow(), WritePrecision.NS)
        
    write_api.write(bucket, org, point)
    return push_value

def pull_value(client, level):
    query_api = client.query_api()
    
    query = 'from(bucket: "haltech_data") \
        |> range(start: -1h) \
        |> filter(fn: (r) => r["_measurement"] == "knock_level") \
        |> filter(fn: (r) => r["level"] == "' + str(level) + '") \
        |> sort(columns: ["_time"], desc: true) \
        |> limit(n:1)'
        
    result = query_api.query(query, org="demo_org")
    duration = 0.0
    
    for table in result:
        for record in table.records:
            duration = record.get_value()
            print(f"Level {record.values.get('level')}: Volume(dB)={record.get_value()}")
            
    return duration