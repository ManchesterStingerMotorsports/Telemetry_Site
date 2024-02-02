import forza_sim_data.data_parser as fsdp
import pandas as pd
import std_writer
import time

from datetime import datetime
import os
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS

# You can generate a Token from the "Tokens Tab" in the UI
token = "SgoCld08-qh4q4pzQ9pRSxWsee62FDmBQe43uvPSR_LmbtdmM4g9p7NNhuQFY8gryc_QIR7SvyA-hLggLDQ2Rg=="
org = "demo_org"
bucket = "haltech_data"

client = InfluxDBClient(url="http://localhost:8086", token=token)

cache_time = fsdp.base_time

for _, data in fsdp.dataframe.iterrows():
    # start = time.time()
    for _, keyblock in fsdp.key_list.iterrows():
        
        value = data[keyblock['corrected_position']]
        if pd.isna(keyblock['conversion']) == False:
            value = value * keyblock['conversion']
            
        std_writer.push_value(client, can_id=keyblock['can_id'], position=keyblock['can_position'], value=value)
    
    # end = time.time()
    # print(f"Time taken: {end - start} seconds")
    # print(f"Actual Delta Time: {(data[1] - cache_time) / 1000} seconds")
        