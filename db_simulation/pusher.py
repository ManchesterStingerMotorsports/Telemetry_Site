from datetime import datetime
import os
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS

# You can generate a Token from the "Tokens Tab" in the UI
token = "SgoCld08-qh4q4pzQ9pRSxWsee62FDmBQe43uvPSR_LmbtdmM4g9p7NNhuQFY8gryc_QIR7SvyA-hLggLDQ2Rg=="
org = "demo_org"
bucket = "haltech_data"

client = InfluxDBClient(url="http://localhost:8086", token=token)

import generators.ox364 as gen_0x364

print(gen_0x364.push_value(client, 1))
print(gen_0x364.pull_value(client, 1))
