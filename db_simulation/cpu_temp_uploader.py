from influxdb_client import InfluxDBClient
import std_writer

def get_cpu_temperature():
    try:
        with open('/sys/class/thermal/thermal_zone0/temp', 'r') as temp_file:
            temp_md = int(temp_file.read().strip())

        temp_in_celsius = temp_md / 1000.0
        return temp_in_celsius
    
    except FileNotFoundError:
        return None
    

# # You can generate a Token from the "Tokens Tab" in the UI
token = "SgoCld08-qh4q4pzQ9pRSxWsee62FDmBQe43uvPSR_LmbtdmM4g9p7NNhuQFY8gryc_QIR7SvyA-hLggLDQ2Rg=="
org = "demo_org"
bucket = "haltech_data"

client = InfluxDBClient(url="http://localhost:8086", token=token)

while True:
    temp = get_cpu_temperature()
    std_writer.push_value(client, "ce_temps", "pi_cpu", temp)