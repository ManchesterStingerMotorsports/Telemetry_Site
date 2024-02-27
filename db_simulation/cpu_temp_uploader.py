from influxdb_client import InfluxDBClient
import std_writer
import token_book

def get_cpu_temperature():
    try:
        with open('/sys/class/thermal/thermal_zone0/temp', 'r') as temp_file:
            temp_md = int(temp_file.read().strip())

        temp_in_celsius = temp_md / 1000.0
        return temp_in_celsius
    
    except FileNotFoundError:
        return int(0)
    

# # You can generate a Token from the "Tokens Tab" in the UI
token = token_book.token
org = token_book.org
bucket = "haltech_data"

client = InfluxDBClient(url="http://localhost:8086", token=token)

while True:
    temp = get_cpu_temperature()
    std_writer.push_value(client, "ce_temps", "pi_cpu", temp)