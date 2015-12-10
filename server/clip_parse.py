# I suck at Python

import codecs

# read in the kindle clippings file encoded with utf-8
with codecs.open("My Clippings.txt", encoding='utf-8') as open_clip:
	my_clip = open_clip.read()

clip_lst = []
# split the long string based on lines
mc = my_clip.split("==========")

# convert each clip into a dictionary with text, title and author keys
for clip in mc:
	dictionary = {}
	clip_array = clip.strip().splitlines()
	try:
		if clip_array[0] == 'My Clippings':
			continue
		dictionary['author'] = clip_array[0].rstrip("*")[clip_array[0].rfind("(")+1:-1]
		dictionary['title'] = clip_array[0].lstrip("*")[0:clip_array[0].find("(")-1]
		dictionary['text'] = clip_array[3]
		clip_lst.append(dictionary) 
	except:
		continue

import json
import io
with io.open('kindle_clips.json', 'w', encoding='utf-8') as json_file:
	data = json.dumps(clip_lst, ensure_ascii=False)
	json_file.write(data)