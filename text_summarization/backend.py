import numpy as np 
import pandas as pd 
import nltk 
import re 

from nltk.tokenize import sent_tokenize
from nltk.corpus import stopwords

from sklearn.metrics.pairwise import cosine_similarity

import networkx as nx

def initialise():
    nltk.download('punkt')
    nltk.download('stopwords')

def removeStopwords(sen):
    sen_new = " ".join([i for i in sen if i not in stop_words])
    return sen_new

sentences = []
def tokenizeSentence(input):
    for s in input.split("\n"):
        sentences.append(sent_tokenize(s))
    sentences = [y for x in sentences for y in x]
    # remove punctuations, numbers and special characters
    clean_sentences = pd.Series(sentences).str.replace("[^a-zA-Z]", " ")

    # make alphabets lowercase
    clean_sentences = [s.lower() for s in clean_sentences]
    stop_words = stopwords.words('english')

    clean_sentences = [removeStopwords(r.split()) for r in clean_sentences]

    return clean_sentences

def extractSentenceVectors(clean_sentences, word_embeddings):
    sentence_vectors = []
    for i in clean_sentences:
        if len(i) != 0:
            v = sum([word_embeddings.get(w, np.zeros((100,))) for w in i.split()])/ (len(i.split())+0.001)
        else:
            v = np.zeros((100,))
        
        sentence_vectors.append(v)
    
    return sentence_vectors

def pageRank(sentence_vectors):
    sim_mat = np.zeros([len(sentences), len(sentences)])
    for i in range(len(sentences)):
        for j in range(len(sentences)):
            if i != j:
                sim_mat[i][j] = cosine_similarity(sentence_vectors[i].reshape(1,100),sentence_vectors[j].reshape(1,100))[0,0]
    nx_graph = nx.from_numpy_array(sim_mat)
    scores = nx.pagerank(nx_graph)

    ranked_sentences = sorted(((scores[i],s) for i,s in enumerate(sentences)), reverse=True)
    return ranked_sentences


def createWordEmbedding():
    word_embeddings = {}
    f = open('glove.6B/glove.6B.100d.txt', encoding='utf-8')
    for line in f:
        values = line.split()
        word = values[0]
        coefs = np.asarray(values[1:], dtype = 'float32')
        word_embeddings[word] = coefs
    f.close()

    return word_embeddings

def handleInput(input):
    initialise()
    clean_sentences = tokenizeSentence(input)
    word_embeddings = createWordEmbedding()
    sentence_vectors = extractSentenceVectors(clean_sentences, word_embeddings)
    ranked_sentences = pageRank(sentence_vectors)
    return ranked_sentences

    



