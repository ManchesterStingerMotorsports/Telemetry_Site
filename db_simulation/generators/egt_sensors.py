from datetime import datetime
import os
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS
import random

# CAN 0x373-Ox375: EGT Sensors (1-4)

def generate_random_value():
    x = random.uniform(6731.5, 12735)
    y = x / 10
    return y

def push_value(client: InfluxDBClient, sensor):
    write_api = client.write_api(write_options=SYNCHRONOUS)
    org = "demo_org"
    bucket = "haltech_data"
    push_value = generate_random_value()
    
    point = Point("egt_sensors") \
        .tag("sensor", sensor) \
        .field("temp", push_value) \
        .time(datetime.utcnow(), WritePrecision.NS)
        
    write_api.write(bucket, org, point)
    return push_value

def pull_value(client, sensor):
    query_api = client.query_api()
    
    query = 'from(bucket: "haltech_data") \
        |> range(start: -1h) \
        |> filter(fn: (r) => r["_measurement"] == "egt_sensors") \
        |> filter(fn: (r) => r["sensor"] == "' + str(sensor) + '") \
        |> sort(columns: ["_time"], desc: true) \
        |> limit(n:1)'
        
    result = query_api.query(query, org="demo_org")
    lambda_value = 0.0
    
    for table in result:
        for record in table.records:
            lambda_value = record.get_value()
            print(f"Sensor {record.values.get('sensor')}: Temp={record.get_value()}")
            
    return lambda_value