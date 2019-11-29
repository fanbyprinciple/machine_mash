app = Flask(__name__)
@app.route('/api/makeplc/', methods=['POST'])

def makecalc():

    jsonfile = request.get_json()
    
    return jsonify(res)


if __name__ == '__main__':

    model = pickle.load(open('modelfile', 'rb'))
    app.run(debug=True)

    

