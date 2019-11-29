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

X = np.array(data.drop(['dteday', 'mnth', 'casual', 'registered', 'cnt'], axis=1))
Y = np.array(data['cnt'])

X_train, X_test = X[:offset], X[offset:]
Y_train, Y_test = Y[:offset], Y[offset:]

RF = RandomForestRegressor()

RF.fit(X_train,Y_train)

with open("modelfile.pickle", 'wb') as handle :
    pickle.dump(RF, handle,protocol=pickle.HIGHEST_PROTOCOL)
