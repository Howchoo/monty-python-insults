import os
from flask import Flask, render_template, request

app = Flask(__name__)

@app.route("/")
def index():
    from_reddit = request.referrer and 'reddit' in request.referrer
    return render_template('index.html', from_reddit=from_reddit)

if __name__ == "__main__":
    debug = os.environ.get("MONTY_PYTHON_DEV", False)
    app.run(debug=debug, host='0.0.0.0')
