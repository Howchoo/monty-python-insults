import os
from flask import Flask, render_template, request, jsonify

from werkzeug.contrib.cache import MemcachedCache

from lib import get_guid

app = Flask(__name__)
cache = MemcachedCache(['127.0.0.1:11211'])

@app.route("/")
def index():
    return render_template('index.html')

if __name__ == "__main__":
    debug = os.environ.get("MONTY_PYTHON_DEV", False)
    app.run(debug=debug, host='0.0.0.0')
