from flask import Flask, request, jsonify
from flask_socketio import SocketIO, emit, send
from flask_mysqldb import MySQL
from flask_cors import CORS, cross_origin
from datetime import date, datetime
import collections
import json

app = Flask(__name__)
app.config['SECRET_KEY'] = 'secret!'
socketIO = SocketIO(app)
socketIO.init_app(app, cors_allowed_origins="*")
CORS(app)

app.config['MYSQL_HOST'] = 'localhost'
app.config['MYSQL_USER'] = 'root'
app.config['MYSQL_PASSWORD'] = ''
app.config['MYSQL_DB'] = 'commentblog'

mysql = MySQL(app)


@app.route('/', methods=['GET'])
@cross_origin()
def readData():
    mycursor = mysql.connection.cursor()
    selectQuery = "select * from userComments"
    mycursor.execute(selectQuery)
    record = mycursor.fetchall()
    mycursor.close()
    return {"record": formatToJson(record)}


@app.route('/', methods=['POST'])
@cross_origin()
def post():
    if request.method == "POST":
        mycursor = mysql.connection.cursor()
        insertQuery = "INSERT INTO usercomments (name, email, comments, date)  VALUES (%s, %s, %s, %s) "
        body = request.json
        dateTimeObj = datetime.now()
        strDate = dateTimeObj.strftime("%d %B, %Y")
        records = (body['name'], body['email'],
                   body['comments'], strDate)
        mycursor.execute(insertQuery, records)
        mysql.connection.commit()

        selectQuery = "select * from userComments"
        mycursor.execute(selectQuery)
        record = mycursor.fetchall()
        jsonData = formatToJson(record)
        mycursor.close()
        socketIO.emit('connected', json.dumps(jsonData), broadcast=True)
        return jsonify({"inserted": True})


@socketIO.on('connected')
@cross_origin()
def fetchData(msg):
    send(msg)
    socketIO.emit('connected', json.dumps(jsonData), broadcast=True)


def formatToJson(rows):
    objects_list = []
    for row in rows:
        d = collections.OrderedDict()
        d['name'] = row[0]
        d['email'] = row[1]
        d['comments'] = row[2]
        d['date'] = row[3]
        objects_list.append(d)
    return objects_list


if __name__ == "__main__":
    socketIO.run(app, debug=True)
