from flask import Flask, request, jsonify, render_template
from flask import url_for
from flask import send_file,send_from_directory, abort, request ,jsonify
from flask import Response
from flask_caching import Cache
from flask import make_response
import mimetypes
from datetime import datetime

import io
import os
import KHA331
import pymysql
import requests

from flask_sqlalchemy import SQLAlchemy
app = Flask(__name__)
app.config['SQLALCHEMY_DATABASE_URI'] = 'mysql+pymysql://kerimniy:719641@localhost/mydb'
db = SQLAlchemy(app)


class Post(db.Model):
    id = db.Column(db.Integer, primary_key=True)



@app.route("/")
def index():
    hostname = request.scheme +"://" + request.host
    return render_template("index.html",hostname=hostname )


@app.route("/add_user", methods=["POST", "GET"])
def add_user():
    if request.method == "POST":
        return "coce"
    else:
        return render_template("form.html")


@app.route("/kha331", methods=["POST", "GET"])
def calc():
    return render_template("KHA_online.html")


@app.route("/calculate", methods=["POST", "GET"])
def calculate():
    try:
        _input = request.get_json()
        string= _input.get("input_str")
        result = KHA331.Cryptography.get_hash_code(string)
        print(result)
        return jsonify({'result': str(result)})

    
    except Exception as e: 
        return jsonify({'result': ("Ошибка: ",str(e))})


@app.route('/downloadfromgithub/')
def downloadfromgithubTemplate():
    return render_template("gitdown.html")


@app.route('/gitload')
def gitdownload():
    try:
        url = request.args.get('url')

        sliced = url.split("/")
        if sliced[2][0:6] =="github" or sliced[2][4:21] =="githubusercontent":
            file=requests.get(url,timeout=10)

            file_name = sliced[len(sliced)-1]

            myBytesIO = io.BytesIO(file.content)
            myBytesIO.seek(0)
            if not file.content:
                    return "Ошибка: получен пустой файл", 500
            return send_file(myBytesIO,as_attachment=True,download_name= file_name)
        else:
            return "Разрешён только GitHub"
    except Exception:
        return "Простите, но операция не удалась (" + Exception+")"


@app.route('/download/shifr')
def download_file():
    try:
        safe_path= "other/KHA-331_APP.zip"
        return send_from_directory('static', safe_path,as_attachment=True)
    except FileNotFoundError:
        print("404")
        abort(404)


@app.route("/open")
def downloadFromPath():
    try:
        url = request.args.get('file')
        response = send_from_directory('static', url,as_attachment=False)
        response.headers['X-Custom-Header'] = 's'
        return response
    except Exception as Ex:
        abort(404)


@app.route("/npps")
def nppsf():
    manual_url = request.scheme +"://" + request.host + "/open?file=other/manual.pdf"
    hostname = request.scheme +"://" + request.host
    
    return render_template("npps.html",manual_url=manual_url,hostname=hostname)


@app.route("/sitemap")
def sitemapf():
    hostname = request.scheme +"://" + request.host
    return render_template("sitemap.html",hostname=hostname)


@app.errorhandler(404)
def not_found_error(error):
    hostname = request.scheme +"://" + request.host
    return render_template('404.html',hostname = hostname),404

@app.errorhandler(406)
def not_allowed(error):
    return "406 Not Acceptable", 406

if __name__ == '__main__':
    app.run(debug=True, host='localhost', port=5000)