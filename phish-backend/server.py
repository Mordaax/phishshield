from fastapi import FastAPI, Request
import uvicorn
from predictor import modelpredict
import numpy as np
from fastapi.middleware.cors import CORSMiddleware
from pydantic import BaseModel

app = FastAPI()

origins = [
    "http://localhost",
    "http://localhost:3000",
    "http://127.0.0.1",
    "http://127.0.0.1:3000",
    "https://phishdetector.vercel.app/",
]

app.add_middleware(
    CORSMiddleware,
    allow_origins=origins,
    allow_credentials=True,
    allow_methods=["*"],
    allow_headers=["*"],
)

class Url(BaseModel):
    url: str

@app.post('/predict')
async def predict(url: Url):
    #print(url)
    prediction = await modelpredict(url.url)
    probability = int(round(prediction,2)*100)
    if prediction > 0.5:
        prediction_str = True 
    elif prediction > 0:
        prediction_str = False
    #print(prediction[0])
    else:
        probability = -1
        prediction_str = False
    return {'prediction': prediction_str,
            'probability':str(probability)}

if __name__ == '__main__':
    uvicorn.run(app, host='0.0.0.0', port=8000)