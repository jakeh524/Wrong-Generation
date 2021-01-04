#!/usr/local/bin/python3
import sqlite3 as lite
from pymongo import MongoClient
import pandas as pd


client = MongoClient("mongodb+srv://jakeherron:roxyskip@cluster0.d1jtg.mongodb.net/wrong-generation?retryWrites=true&w=majority")
db = client["wrong-generation"]
col = db["charts"]


connection = lite.connect('billboard.db')

with connection:
	chart_date_list = []

	cur = connection.cursor()
	cur.execute("SELECT name FROM sqlite_master WHERE type='table';")
	tables = cur.fetchall()
	for table_name in tables:
	    table_name = table_name[0]
	    chart_date_list += [table_name]


	for date in chart_date_list:
		chart_date = date
		entries = []
		select_query = "SELECT * from [" + chart_date + "]"
		cur.execute(select_query)
		chart_data = cur.fetchall()
		for i in range(0, 100):
			try:
				artist_name = chart_data[i][2]
				artist_name = artist_name.partition("Featuring")[0]
				song_name = chart_data[i][1]
				position = chart_data[i][0]
				entries += [ {"position": position, "artist": artist_name, "song": song_name} ]
			except IndexError:
				entries += [ {"position": None, "artist": None, "song": None}]		
		chart = {
			"date": chart_date,
			"entries": entries
		}
		x = col.insert_one(chart)
		print(x.inserted_id)
		



cur.close()
connection.close()

