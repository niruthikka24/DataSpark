import json
from urllib import response
import requests
from models import Dataset

BASE = "http://127.0.0.1:5000/"
input()

# response = requests.get(BASE+'/user_search/10')
# print(response.json())

# response = requests.post(BASE+'/AddDataset/1/1/testdata/name123')
# print(response.json())

response = requests.post(BASE+'/SearchDataset/1')
print(response.json())
