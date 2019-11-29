from flask import Flask, request, redirect, url_for, flash, jsonify
from return_feature import  doTheCalculation

import json, pickle
import pandas as pd 

import numpy as np   

app = Flask(__name__)

@app.route('/api/makecalc/', methods=['POST'])

def makecalc():

    jsonfile = request.get_json()

    data = pd.read_json(json.dumps(jsonfile), orient='index', convert_dates=['dteday'])
    
    print(data)

    res = dict()

    ypred = model.predict(doTheCalculation(data))

    for i in range(len(ypred)):
        res[i] = ypred[i]


    return jsonify(res)


if __name__ == '__main__':

    model = pickle.load(open('modelfile.pickle', 'rb'))
    app.run(debug=True)

    

