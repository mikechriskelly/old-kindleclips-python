import json

def parse_clips(my_clippings):
	clip_lst = []
	# split the long string based on lines
	# my_clippings = my_clippings.encode('utf-8')
	mc = my_clippings.split("==========")

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
	return json.dumps(clip_lst, ensure_ascii=False)