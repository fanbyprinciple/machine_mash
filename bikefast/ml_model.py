import pandas as pd 

import numpy as np  

from datetime import date

from sklearn.ensemble import RandomForestRegressor
from sklearn.metrics import mean_squared_error
import matplotlib
import pickle

data = pd.read_csv('bike/day.csv', parse_dates=['dteday'])

print(data.head())

data['dayofyear'] = (data['dteday'] - data['dteday'].apply(lambda x : date (x.year,1,1)).astype('datetime64[ns]')).apply(lambda x: x.days)

offset = int(len(data)*0.8)