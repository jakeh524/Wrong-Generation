#!/usr/bin/python

# Author: Jake Herron
# Email: jakeh524@gmail.com

from lxml import html
import sqlite3 as lite
import requests
import pandas as pd
from time import sleep

def all_saturdays(year):
	saturdays = pd.date_range(start = str(year), end = str(year + 1), freq = 'W-SAT').strftime('%Y-%m-%d').tolist()
	return(saturdays)

con = lite.connect('billboard.db')
base_url = "https://www.billboard.com/charts/hot-100/"

for year in range(1962, 2020):
	list_of_saturdays = all_saturdays(year)

	for saturday in range(0, len(list_of_saturdays)):
		url = base_url + list_of_saturdays[saturday]
		print(url)
		
		while(True):
			page = requests.get(url)
			if(page.status_code == 200):
				break
			elif(page.status_code == 404):
				print("404")
				sleep(10)
				continue

			tree = html.fromstring(page.content)

			songs = tree.xpath('//span[@class="chart-element__information__song text--truncate color--primary"]/text()')
			artists = tree.xpath('//span[@class="chart-element__information__artist text--truncate color--secondary"]/text()')
			positions = tree.xpath('//span[@class="chart-element__rank__number"]/text()')

			with con:
				cur = con.cursor()

				table_name = "[" + list_of_saturdays[saturday] + "]"
				query_create = "CREATE TABLE IF NOT EXISTS " + table_name + "(position TEXT, song TEXT, artist TEXT)"
				cur.execute(query_create)

				for i in range(0, len(positions)):
					query_insert = "INSERT INTO " + table_name + " VALUES(?, ?, ?)"
					cur.execute(query_insert, (positions[i], songs[i], artists[i]))

			







