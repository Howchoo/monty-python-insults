from flask import Flask, render_template, request, jsonify

from werkzeug.contrib.cache import MemcachedCache

from lib import get_guid

app = Flask(__name__)
cache = MemcachedCache(['127.0.0.1:11211'])

@app.route("/")
def index():
    share_guid = request.args.get('share_guid', None)
    og = {
        "title": cache.get(share_guid) if share_guid else None
        }
    return render_template('index.html', og=og)

@app.route("/save-share-data", methods=['POST'])
def save_share_data():
    title = request.form['title']
    guid = get_guid()

    cache.set(guid, title, 10800)

    response = jsonify(guid=guid)
    response.status_code = 201

    return response


if __name__ == "__main__":
        app.run(debug=True)
