import sys
import requests
import json
import numpy as np
import re
import pandas as pd
import yake
import os


# importing pandas module
# # get current working directory
# cwd = os.getcwd()
# # get files in directory
# files = os.listdir(cwd)
# print(files)
# __location__ = os.path.realpath(
    # os.path.join(os.getcwd(), os.path.dirname(__file__)))
# filepath = r"C:\Users\MukulMishra\Desktop\aptyproductflow\searchHouse\archive\synonyms.csv"
# filepath = r"https://s3.us-west-2.amazonaws.com/farm1.mukul/diction/synonyms.csv"
filepath = r"synonyms.csv"
# filepath = open(os.path.join(__location__, 'synonyms.csv'))
df = pd.read_csv(filepath)

# Get the command line arguments
# and parse it to json

# hardcoded-> 
# text = "Write your text here"
text = sys.argv[1]


kw_extractor = yake.KeywordExtractor()
keywords = kw_extractor.extract_keywords(text)
language = "en"
max_ngram_size = 1
deduplication_thresold = 0.9
deduplication_algo = 'seqm'
windowSize = 1
numOfKeywords = 5
res = []
dfar = np.array(df)
finalwords = []
singleList = []
# iterating using loop
# print(keywords)
for ele in dfar:
    for word in ele:
        for kw in keywords:
            space = bool(re.search(r"\s", kw[0]))
            if not space:
                if kw[0].lower() == word:
                    res.append(ele)
for synonyms in res:
    synonymsResolve = synonyms[2].replace(";", "|").split("|")
    for hh in synonymsResolve:

        singleList.append(hh)
    singleList.append(synonyms[0])

data = list(dict.fromkeys(list(map(lambda x: x.lower(), singleList))))
resp = {
    "Response": 200,
    "Message": "Accessing Python MAKE Lib ~ mukul.tsw",
    "Unique Keywords": data
}
print(json.dumps(resp))
sys.stdout.flush()
