import re
import tensorflow as tf
import pandas as pd
import mmap 
model = tf.keras.models.load_model('model.h5')

async def modelpredict(url):
    

    url_length = len(url)
    alpha=0
    numeric=0

    try:
        token = re.findall('(\w+)://',url)[0]
        hostname, port, path = re.findall(':\/\/([\w\-\.]+):?(\d+)?([A-Za-z0-9-\/]+)', url)[0]
    except:
        return -1
    
    with open(r'ALL-phishing-links.txt', 'rb', 0) as file:
        s = mmap.mmap(file.fileno(), 0, access=mmap.ACCESS_READ)
        if s.find(bytes(url, 'utf-8')) != -1:
            return 1
    


    #hostname, port, path = re.findall('://([\w\-\.]+)[:(\d+\/)]([A-Za-z0-9-/]+)', url)[0]
    features = [url_length, len(hostname)]
    for character in '.-@?&=_~%/*:,;$ ':
        features.append(url.count(character))



    in_path =  1 if 'http' in path else 0
    http_token = 1 if token != 'https' else 0
    has_port = 1 if port else 0
    for i in url:  
        if (i.isnumeric()):
            numeric+=1
    def check_abnormal_subdomain(s):
        a = s.split('.')
        if len(a) != 4:
            return 0
        for x in a:
            if not x.isdigit():
                return 0
            i = int(x)
            if i < 0 or i > 255:
                return 0
        return 1
    raw = hostname+path

    def splitwords(string):
        word_length = []
        string+='/'
        current_word = ''
        for char in string:

            if char.isalnum():
                current_word+=char
            else:

                word_length.append(len(current_word))
                current_word=''

        return word_length

    raw_lengths = splitwords(raw)
    host_lengths = splitwords(hostname)
    path_lengths = splitwords(path[1:])

    def avg(lengths):
        return sum(lengths)/len(lengths)

    features.extend([url.count('www'), url.count('com')-1,in_path, http_token, numeric/len(url), has_port, check_abnormal_subdomain(hostname)])
    features.extend([min(raw_lengths), min(host_lengths), min(path_lengths),max(raw_lengths), max(host_lengths), max(path_lengths),avg(raw_lengths), avg(host_lengths), avg(path_lengths) ]) 
    

    features2 = pd.DataFrame([features])

    prob = model.predict(features2)
    return prob[0][0]