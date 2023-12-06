from datetime import datetime
import os
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS
import random

# CAN 0x364: Injection Stage avg. time (1-4)

# Range: 10-100ms (output)
def generate_random_value():
    x = random.uniform(10000, 100000)
    y = x / 1000
    return y

def push_value(client: InfluxDBClient, stage):
    write_api = client.write_api(write_options=SYNCHRONOUS)
    org = "demo_org"
    bucket = "haltech_data"
    push_value = generate_random_value()
    
    point = Point("avg_injection_time") \
        .tag("stage", stage) \
        .field("duration", push_value) \
        .time(datetime.utcnow(), WritePrecision.NS)
        
    write_api.write(bucket, org, point)
    return push_value

def pull_value(client, stage):
    query_api = client.query_api()
    
    query = 'from(bucket: "haltech_data") \
        |> range(start: -1h) \
        |> filter(fn: (r) => r["_measurement"] == "avg_injection_time") \
        |> filter(fn: (r) => r["stage"] == "' + str(stage) + '") \
        |> sort(columns: ["_time"], desc: true) \
        |> limit(n:1)'
        
    result = query_api.query(query, org="demo_org")
    duration = 0.0
    
    for table in result:
        for record in table.records:
            duration = record.get_value()
            print(f"Stage {record.values.get('stage')}: Duration(ms)={record.get_value()}")
            
    return duration