from flask import Flask, render_template,jsonify,request
from flask_cors import CORS
import requests,openai,os
from dotenv.main import load_dotenv
from langchain.prompts.pipeline import PipelinePromptTemplate
from langchain.prompts.prompt import PromptTemplate
import pyttsx3
from src.exception import CustomException
import sys
app = Flask(__name__)
CORS(app)
load_dotenv()
API = os.environ['OPENAI_API_KEY']

def speak(message, voice="default"):
    try:
        engine = pyttsx3.init()
        voices = engine.getProperty('voices')
        if voice == "male":
            engine.setProperty('voice', voices[0].id)
        elif voice == "female":
            engine.setProperty('voice', voices[1].id)
        else:
            engine.setProperty('voice', voices[0].id)  # Default to male voice

        engine.say(message)
        engine.runAndWait()
    except Exception as e:
        raise CustomException(e, sys)
    