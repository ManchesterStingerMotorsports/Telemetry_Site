import pandas as pd

df = pd.read_csv('OpenLAP_cleaned.csv', sep=',')
print(df)
print("---------")
print(df['gear'])
print("---------")
print(df.head())