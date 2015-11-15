import os
from flask import Flask, render_template

app = Flask(__name__)

@app.route("/")
def index():
    return render_template('index.html')

if __name__ == "__main__":
    debug = os.environ.get("MONTY_PYTHON_DEV", False)
    app.run(debug=debug, host='0.0.0.0')
