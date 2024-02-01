from datetime import datetime
import os
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS
import std_writer

# You can generate a Token from the "Tokens Tab" in the UI
token = "SgoCld08-qh4q4pzQ9pRSxWsee62FDmBQe43uvPSR_LmbtdmM4g9p7NNhuQFY8gryc_QIR7SvyA-hLggLDQ2Rg=="
org = "demo_org"
bucket = "haltech_data"

client = InfluxDBClient(url="http://localhost:8086", token=token)

random_val = std_writer.generate_random_value()
std_writer.push_value(client, "0x360", "0-1", random_val)
std_writer.pull_value(client, "0x360", "0-1")