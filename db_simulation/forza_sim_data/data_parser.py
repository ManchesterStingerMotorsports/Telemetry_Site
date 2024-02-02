import pandas as pd

# https://medium.com/@makvoid/building-a-digital-dashboard-for-forza-using-python-62a0358cb43b

def load_dataframe():
    df = pd.read_json('forza_sim_data/dash_lap.json')
    df = df[df.iloc[: ,0] != 0] # Remove rows with raceOn == 0
    return df

def load_key_list():
    df = pd.read_csv('forza_sim_data/data_keys/data_key_list.csv')
    return df

dataframe = load_dataframe()
key_list  = load_key_list()
base_time = dataframe.iloc[:, 1].min()

print(base_time)