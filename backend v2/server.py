from flask import Flask, jsonify
from flask_cors import CORS
from flask import request;

SECRET = "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"

import os 
import openai
import re

openai.api_key='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'

# -*- coding: utf-8 -*-
# Set up the model and prompt
model_engine = "text-davinci-003"

alphabets= "([A-Za-z])"
prefixes = "(Mr|St|Mrs|Ms|Dr)[.]"
suffixes = "(Inc|Ltd|Jr|Sr|Co)"
starters = "(Mr|Mrs|Ms|Dr|Prof|Capt|Cpt|Lt|He\s|She\s|It\s|They\s|Their\s|Our\s|We\s|But\s|However\s|That\s|This\s|Wherever)"
acronyms = "([A-Z][.][A-Z][.](?:[A-Z][.])?)"
websites = "[.](com|net|org|io|gov|edu|me)"
digits = "([0-9])"

def split_into_sentences(text):
    text = " " + text + "  "
    text = text.replace("\n"," ")
    text = re.sub(prefixes,"\\1<prd>",text)
    text = re.sub(websites,"<prd>\\1",text)
    text = re.sub(digits + "[.]" + digits,"\\1<prd>\\2",text)
    if "..." in text: text = text.replace("...","<prd><prd><prd>")
    if "Ph.D" in text: text = text.replace("Ph.D.","Ph<prd>D<prd>")
    text = re.sub("\s" + alphabets + "[.] "," \\1<prd> ",text)
    text = re.sub(acronyms+" "+starters,"\\1<stop> \\2",text)
    text = re.sub(alphabets + "[.]" + alphabets + "[.]" + alphabets + "[.]","\\1<prd>\\2<prd>\\3<prd>",text)
    text = re.sub(alphabets + "[.]" + alphabets + "[.]","\\1<prd>\\2<prd>",text)
    text = re.sub(" "+suffixes+"[.] "+starters," \\1<stop> \\2",text)
    text = re.sub(" "+suffixes+"[.]"," \\1<prd>",text)
    text = re.sub(" " + alphabets + "[.]"," \\1<prd>",text)
    if "”" in text: text = text.replace(".”","”.")
    if "\"" in text: text = text.replace(".\"","\".")
    if "!" in text: text = text.replace("!\"","\"!")
    if "?" in text: text = text.replace("?\"","\"?")
    text = text.replace(".",".<stop>")
    text = text.replace("?","?<stop>")
    text = text.replace("!","!<stop>")
    text = text.replace("<prd>",".")
    sentences = text.split("<stop>")
    sentences = sentences[:-1]
    sentences = [s.strip() for s in sentences]
    return sentences
  
def StoryTime(init_prompt):
    completion = openai.Completion.create(
        engine=model_engine,
        prompt=init_prompt,
        max_tokens=1024,
        n=1,
        stop=None,
        temperature=0.5,
    )
    init_response = completion.choices[0].text
    print(init_response)

    senz = split_into_sentences(init_response)
    print(senz)
    imgz = []
    for i in senz:
        print(i)
        #imgz.append({"data": [{"url": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jQc5qwHq4jpEbvTYWCR20ewR/user-AhSTpHqXPQSfa1zOeefgJRZM/img-bHfJQJ3gvkcg6bIKRrysMNNT.png?st=2023-01-29T14%3A28%3A54Z&se=2023-01-29T16%3A28%3A54Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-29T15%3A28%3A54Z&ske=2023-01-30T15%3A28%3A54Z&sks=b&skv=2021-08-06&sig=3ZZ5iVAYQnUZDHTm9ipzp9M%2BCjz%2BxYOBQbvFNjx3Iq8%3D"}]})
        imgz.append(openai.Image.create(
            prompt=i,
            n=1,
            size="1024x1024"
        ))

    print(imgz)


    url_list = []
    for item in imgz:
        url_list.append(item["data"][0]["url"])
        
    print(url_list)
   
    pages = [{'sentence': s, 'image': url} for s, url in zip(senz, url_list)]

    return pages

DEBUG = True

app = Flask(__name__)
app.config.from_object(__name__)

CORS(app, resources = {r'/*': {'origins': '*'}})


@app.route("/")
def hello():
    return "Hello World!"

@app.route("/get_pages", methods=['POST']) 
#takes in prompt, gives you pages
def get_pages():
    x = request.json['prompt']
    print(x)
    pages = [
    {
        "image": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jQc5qwHq4jpEbvTYWCR20ewR/user-AhSTpHqXPQSfa1zOeefgJRZM/img-joiGI07flksecyKJRcS4izTt.png?st=2023-01-29T15%3A25%3A12Z&se=2023-01-29T17%3A25%3A12Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-29T16%3A25%3A12Z&ske=2023-01-30T16%3A25%3A12Z&sks=b&skv=2021-08-06&sig=Sjpe7BQliMKMKIFucwoExFHar7e8GCwmhE5pPccmN6E%3D",
        "sentence": "Once there was a dog named Rex."
    },
    {
        "image": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jQc5qwHq4jpEbvTYWCR20ewR/user-AhSTpHqXPQSfa1zOeefgJRZM/img-joiGI07flksecyKJRcS4izTt.png?st=2023-01-29T15%3A25%3A12Z&se=2023-01-29T17%3A25%3A12Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-29T16%3A25%3A12Z&ske=2023-01-30T16%3A25%3A12Z&sks=b&skv=2021-08-06&sig=Sjpe7BQliMKMKIFucwoExFHar7e8GCwmhE5pPccmN6E%3D",
        "sentence": "He loved to go for long walks and play fetch with his owners."
    },
    {
        "image": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jQc5qwHq4jpEbvTYWCR20ewR/user-AhSTpHqXPQSfa1zOeefgJRZM/img-bHfJQJ3gvkcg6bIKRrysMNNT.png?st=2023-01-29T14%3A28%3A54Z&se=2023-01-29T16%3A28%3A54Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-29T15%3A28%3A54Z&ske=2023-01-30T15%3A28%3A54Z&sks=b&skv=2021-08-06&sig=3ZZ5iVAYQnUZDHTm9ipzp9M%2BCjz%2BxYOBQbvFNjx3Iq8%3D",
        "sentence": "He was always so happy and full of energy."
    },
    {
        "image": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jQc5qwHq4jpEbvTYWCR20ewR/user-AhSTpHqXPQSfa1zOeefgJRZM/img-bHfJQJ3gvkcg6bIKRrysMNNT.png?st=2023-01-29T14%3A28%3A54Z&se=2023-01-29T16%3A28%3A54Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-29T15%3A28%3A54Z&ske=2023-01-30T15%3A28%3A54Z&sks=b&skv=2021-08-06&sig=3ZZ5iVAYQnUZDHTm9ipzp9M%2BCjz%2BxYOBQbvFNjx3Iq8%3D",
        "sentence": "One day, Rex got lost and his owners searched everywhere for him."
    },
    {
        "image": "https://oaidalleapiprodscus.blob.core.windows.net/private/org-jQc5qwHq4jpEbvTYWCR20ewR/user-AhSTpHqXPQSfa1zOeefgJRZM/img-bHfJQJ3gvkcg6bIKRrysMNNT.png?st=2023-01-29T14%3A28%3A54Z&se=2023-01-29T16%3A28%3A54Z&sp=r&sv=2021-08-06&sr=b&rscd=inline&rsct=image/png&skoid=6aaadede-4fb3-4698-a8f6-684d7786b067&sktid=a48cca56-e6da-484e-a814-9c849652bcb3&skt=2023-01-29T15%3A28%3A54Z&ske=2023-01-30T15%3A28%3A54Z&sks=b&skv=2021-08-06&sig=3ZZ5iVAYQnUZDHTm9ipzp9M%2BCjz%2BxYOBQbvFNjx3Iq8%3D",
        "sentence": "Fortunately, they found him and were so relieved to have their beloved dog back home."
    }
]
    return pages


if __name__ == '__main__':
    app.run(host='127.0.0.1', port=5000)