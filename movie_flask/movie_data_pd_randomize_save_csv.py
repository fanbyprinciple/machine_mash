# save dataframe as csv
# 3

import numpy as np 
import pandas as pd

np.random.seed(0)

df = df.reindex(np.random.permutation(df.index))

df.to_csv('movie_data.csv', index=False, encoding='utf-8')

df = pd.read_csv('movie_data.csv', encoding='utf-8')
df.head()