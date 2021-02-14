from flask import Flask
import with_boxes

app = Flask(__name__)
@app.route("/")
def hello():
    return "Hello World! Go to input"
if __name__ == "__main__":
    app.run(host="0.0.0.0", port=int("5000"), debug=True)

