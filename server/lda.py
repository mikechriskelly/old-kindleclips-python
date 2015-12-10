# gensim tutorial from radimrehurek.com

from gensim import corpora, models, similarities
from pprint import pprint   # pretty-printer
from gensim.parsing import PorterStemmer
import codecs
import re

with codecs.open("My Clippings.txt", encoding='utf-8') as open_clip:
	my_clip = open_clip.read()
# split the long string into lines
mc = my_clip.split("\n")
for i in range(len(mc)):
    mc[i] = re.sub(r'[?|$|.|!]',r'',mc[i])
    mc[i] = re.sub(r'[^a-zA-Z0-9 ]',r'',mc[i])


# remove content with slicing - low:high:stride
documents = mc[3:len(mc):5]

with codecs.open("stopwords_long", "r", encoding = 'utf-8') as open_stop:
	stops = open_stop.read()
stoplist = set(stops.split("\n"))

# stops = ' '.join(stopwords.words('english'))
# stoplist = set(stops.split())
 
# list comprehension to convert to lowercase, split docs into a list of words
# and remove stop words
texts = [[word for word in document.lower().split() 
	if word not in stoplist]
        for document in documents]

# Thanks, Internet
global_stemmer = PorterStemmer()
class StemmingHelper(object):
    """
    Class to aid the stemming process - from word to stemmed form,
    and vice versa.
    The 'original' form of a stemmed word will be returned as the
    form in which its been used the most number of times in the text.
    """
 
    #This reverse lookup will remember the original forms of the stemmed
    #words
    word_lookup = {}
 
    @classmethod
    def stem(cls, word):
        """
        Stems a word and updates the reverse lookup.
        """
 
        #Stem the word
        stemmed = global_stemmer.stem(word)
 
        #Update the word lookup
        if stemmed not in cls.word_lookup:
            cls.word_lookup[stemmed] = {}
        cls.word_lookup[stemmed][word] = (
            cls.word_lookup[stemmed].get(word, 0) + 1)
 
        return stemmed
 
    @classmethod
    def original_form(cls, word):
        """
        Returns original form of a word given the stemmed version,
        as stored in the word lookup.
        """
 
        if word in cls.word_lookup:
            return max(cls.word_lookup[word].keys(),
                       key=lambda x: cls.word_lookup[word][x])
        else:
            return word

# create a new list with stemmed using Porter Stemming algo
texts_stem = [ [StemmingHelper.stem(word) for word in text
	if word != text]
		for text in texts]

# this is a gensim dict that gives each term a unique integer id
dictionary = corpora.Dictionary(texts_stem) 
# dictionary.save('/tmp/deerwester.dict') # store the dictionary, for future reference

# this will make a large list that consists of sublists. each sublist is a list of tuples
# The tuples represent the unique word id from above and a freq. count
corpus = [dictionary.doc2bow(text) for text in texts_stem]

# import gensim if something missing
n = 20
lda = models.LdaModel(corpus, id2word=dictionary, num_topics=n)
pprint(lda.print_topics(num_topics=n, num_words = 5))
#hdp = models.HdpModel(corpus, id2word=dictionary)
#pprint(hdp.print_topics())


# create a new list of the highest topic probabilities for each document
doc_topics = []
#for i in range(len(corpus)):
#	doc_by_topic.append(lda.get_document_topics(corpus[i]))
# another way
for i in range(len(corpus)):
	doc_topics.append(lda[corpus[i]])







"""
# The lda library may not be appropriate, there is no pre-processing available

import numpy as np
import lda

## how to make a term document matrix??

model = lda.LDA(n_topics=20, n_iter=1500, random_state=1)

model.fit(xlda)

topic_word = model.topic_word_ # This is an numpy array with # of rows = n_topics and
# number of cols = # of terms. My clippings should be n_topics x ~7300 terms

doc_topic = model.doc_topic_ # numpy array with # rows = # of documents and # of cols
# are = n_topics. My Clippings should be (641(638?) x n_topics)
"""