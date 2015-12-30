#! /usr/bin.python
# -*- coding: utf-8 -*-
from flask import Flask,render_template, request
from flaskext.mysql import MySQL
import json

mysql = MySQL()
app = Flask(__name__)
#MySQL configuration
app.config['MYSQL_DATABASE_USER'] = 'root'
app.config['MYSQL_DATABASE_PASSWORD'] = 'q1w2e3r4'
app.config['MYSQL_DATABASE_HOST'] = 'homework.clqs4ekatbc7.ap-northeast-1.rds.amazonaws.com'
app.config['MYSQL_DATABASE_DB'] = 'budongsan'
mysql.init_app(app)

@app.route('/')
def index():
	return render_template('index.html')

#API
@app.route('/getGu', methods=["GET"])
def loadGu():
	sql = "SELECT * FROM gu;"
	return loadSql(sql)

@app.route('/getDanji',methods=['GET','POST'])
def loadDanji():
	if request.method == 'GET':
		sql = "SELECT * FROM danji LIMIT 300;"
	elif request.method == 'POST':
		bounds = request.form.to_dict()
		sql = "SELECT * FROM danji where (%s BETWEEN %s and %s) and (%s BETWEEN %s and %s);"\
		 %('x',bounds['ca'],bounds['ba'],'y',bounds['T'],bounds['aa'])
		print sql

	return loadSql(sql)

@app.route('/getMemul',methods=["POST"])
def loadMemul(danji):
	return 0

def loadSql(sql):
	cursor = mysql.get_db().cursor()
	cursor.execute(sql)

	result=[]
	columns = tuple(d[0] for d in cursor.description) #value에 description 달기
	for row in cursor:
		result.append(dict(zip(columns, row)))

	return json.dumps(result)



if __name__ == "__main__":
	app.run(debug=True)