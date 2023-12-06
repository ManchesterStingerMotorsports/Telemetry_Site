# NOTES

## Sample Code

https://docs.influxdata.com/influxdb/cloud/api-guide/client-libraries/python/

To write:
```python
point = Point("wideband_sensors") \
  .tag("sensor", 4) \
  .field("lambda", 4.0) \
  .time(datetime.utcnow(), WritePrecision.NS)

write_api.write(bucket, org, point)
```

To read:
```python
query_api = client.query_api()
query = 'from(bucket: "haltech_data") |> range(start: -1h) |> filter(fn: (r) => r["_measurement"] == "wideband_sensors") |> filter(fn: (r) => r["sensor"] == "1")'
result = query_api.query(query, org=org)
print(result)

for table in result:
  for record in table.records:
    print(record.values.get('sensor'), record.get_field(), record.get_value())
```

## Done List
*(CAN IDs)*

- Ox368

## Groups

###  Wideband Sensors (0x368)

Added to DB: [x]

Added Generator: [x]

- Wideband Sensor 1
- Wideband Sensor 2
- Wideband Sensor 3
- Wideband Sensor 4

**Formula**
```
y = x / 1000
``` 
*Unit: Lambda λ*

**Line Protocol**
```
wideband_sensors, sensor=1, lambda=0.0
```

