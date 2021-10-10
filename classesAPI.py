from flask import request, jsonify
import flask
import sqlite3
from flask_cors import CORS, cross_origin

app = flask.Flask(__name__)
cors = CORS(app)

app.config['CORS_HEADERS'] = 'Content-Type'

DATABASE = 'Courses.db'

@app.route('/')
def home():
  app.logger.info("Hello World!")
  return "Hello World!"

@app.route('/api/courses/<term>/', methods=['GET'])
@cross_origin()
def courses(term):
  con = sqlite3.connect(DATABASE)
  con.row_factory = sqlite3.Row
  cur = con.cursor()  
  results = []

  query:str = "SELECT * FROM "+ term + " WHERE "
  for ind, arg in enumerate(request.args.items()):
    if (ind != 0):
      query += " AND "
    query += arg[0] + " = '" + arg[1] + "'"
  query += ';'

  app.logger.info(query)
  for row in cur.execute(query):
    results.append(dict(row))
  
  return jsonify(results)

@app.errorhandler(404) 
def page_not_found(e):
  return "<h1>404</h1><p>The resource could not be found.</p>", 404

app.run(threaded=True, port=5000)