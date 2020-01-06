from flask import Flask, request, redirect, url_for, render_template
import pdb, sys

from sklearn.externals import joblib
m1 = joblib.load('clickbait.pkl')

def score(input_headline):
    pred_score = m1.predict_proba([input_headline])[0]
    if ((pred_score[1]*100 > 40) & ((pred_score[1]*100 < 60))):
        flag = 'Maybe a Bait'
        color = 'is-warning'
    elif (pred_score[1]*100 > 60):
        flag = 'Baity'
        color = 'is-danger'
    else:
        flag = 'Looks Safe'
        color = 'is-success'

    prob = {'clickbait-prob': round(pred_score[1],3), 'notClickbait-prob': round(pred_score[0],3), 'flag': flag, 'color':color}
    return prob
    
app = Flask(__name__)

@app.route('/', methods=['POST', 'GET'])

def index():
    if request.method == 'POST':
        text = request.form['text']
        result = score(text)
    else:
        result = ""
        text = ""
    
    print("headline = " + text, file=sys.stderr)
    print("result = " + str(result), file=sys.stderr)
    
    return render_template('index.html', messages={'result': result, 'sentence': text})


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=8083, debug=True)