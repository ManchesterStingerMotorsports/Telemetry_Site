import forza_sim_data.data_parser as fsdp
import pandas as pd
import std_writer
import time
from tqdm import tqdm

from datetime import datetime
import os
from influxdb_client import InfluxDBClient, Point, WritePrecision
from influxdb_client.client.write_api import SYNCHRONOUS
import bucket as bk

# You can generate a Token from the "Tokens Tab" in the UI
token = bk.token
org = bk.org
bucket = "haltech_data_std"

client = InfluxDBClient(url="http://localhost:8086", token=token)

# cache_time = fsdp.base_time

for _, data in tqdm(fsdp.dataframe.iterrows(), total=fsdp.dataframe.shape[0]):
    # start = time.time()
    for _, keyblock in fsdp.key_list.iterrows():
        
        value = data[keyblock['corrected_position']]
        if pd.isna(keyblock['conversion']) == False:
            value = value * keyblock['conversion']
            
        std_writer.push_value(client, can_id=keyblock['can_id'], position=keyblock['can_position'], value=value)
    
    # end = time.time()
    # print(f"Time taken: {end - start} seconds")
    # print(f"Actual Delta Time: {(data[1] - cache_time) / 1000} seconds")
        