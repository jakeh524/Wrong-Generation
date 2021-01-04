#!/usr/local/bin/python3

import sys
import sqlite3 as lite
from datetime import datetime, timedelta
import argparse

def get_next_saturday(date):
	d = datetime.strptime(date, '%Y-%m-%d')
	t = timedelta((12 - d.weekday()) % 7)
	saturday = (d + t).strftime('%Y-%m-%d')
	return(saturday)


def main(args):
	entered_date = args.date
	list_length = args.length
	chart_date = get_next_saturday(entered_date)

	connection = lite.connect('billboard.db')

	with connection:
		cur = connection.cursor()

		select_query = "SELECT * from [" + chart_date + "]"
		cur.execute(select_query)
		chart_data = cur.fetchall()

		id_list = []
		
		for i in range(0, list_length):
			artist_name = chart_data[i][2]
			artist_name = artist_name.partition("Featuring")[0]
			song_name = chart_data[i][1]
			position = chart_data[i][0]
			print(position, song_name, "|", artist_name)

if __name__ == "__main__":
	parser = argparse.ArgumentParser(description='Enter Date and Length')
	parser.add_argument('-d', '--date', dest='date', type=str, help='date: year-month-day')
	parser.add_argument('-l', '--length', dest='length', type=int, help='length of list')
	args = parser.parse_args()

	main(args)



# example command: ./wrong_generation.py --date="2000-05-24" --length=25






