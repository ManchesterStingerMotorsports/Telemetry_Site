# Telemetry Site

Last Revision: **12/03/2024**
**Note:** This version only contains the **simulation** program - actual connection to CAN is yet to be implemented.

## How to Start
1. Make sure InfluxDB is alive:
```bash
sudo service influxdb start
```

2. Play the Forza Sim Data:
```bash
source .venv/bin/activate
cd db_simulation
python play_forza_data.py
```

## Installation Guide

**Note:** In order to run InfluxDB, a **64-bit** OS must be installed *(ideally, either Ubuntu64 or Raspbian64).*

### Installing TelemetrySite

1. **Clone Repo** and switch to the right branch.
```bash
git clone https://github.com/ManchesterStingerMotorsports/Telemetry_Site.git
git checkout influx_generators
```

2. **Create Virtual Environment** to install packages into, and enter it.
```bash
python3 -m venv ./.venv
source .venv/bin/activate
```

3. **Install Requirements.**
```bash
pip install -r requirements.txt
```

**Install Complete ✅**

### Installing InfluxDB

[🔗 InfluxDB's Install Guide](https://docs.influxdata.com/influxdb/v2/install/?t=linux)

*(Commands below are for **ARM64** systems)*

1. **Install Packages**
```bash
curl -O https://dl.influxdata.com/influxdb/releases/influxdb2_2.7.5-1_arm64.deb
sudo dpkg -i influxdb2_2.7.5-1_arm64.deb
```

2. **Start InfluxDB**
```bash
sudo service influxdb start
```

3. **Set up Credentials**

- First, open ```localhost:8086``` 
- Set an organisation name (it can be any), and bucket name as **haltech_data_std**.

- Then set up account credentials - save them in a txt file just in case (along with the organisation name).

4. **Get API Token**

- Go back to ```localhost:8086```
- On the homepage, click the Python icon under *'Write and query data using the programming language of your choice'*.
- Click on the **'Get Token'** category *(on the left)*.
- Copy the token value and save this in the txt file aswell.

5. **Add Credentials to TelemetrySite**

- Navigate to the **db_simulation** folder, and create a new file called **bucket.py**:

```bash
cd db_simulation
touch bucket.py
```

- Copy and paste the below template, and change token name/org name with their respective values:

```python
# Store Token, Org Name...
token = "TOKEN NAME"
org = "ORG NAME"
```

**InfluxDB configuration Complete ✅**
