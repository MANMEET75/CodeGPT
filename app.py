from flask import Flask, render_template,jsonify,request
from flask_cors import CORS
import requests,openai,os
from dotenv.main import load_dotenv
from langchain.prompts.pipeline import PipelinePromptTemplate
from langchain.prompts.prompt import PromptTemplate
import pyttsx3
app = Flask(__name__)
CORS(app)
load_dotenv()
API = os.environ['OPENAI_API_KEY']

@app.route('/static/<path:filename>')
def serve_static(filename):
    return app.send_static_file(filename)

def speak(message, voice="default"):
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

@app.route('/')
def index():
    chatbotMessage="Hey, Kindly provide both the programming language name and the topic, to facilitate the output generation."
    voice = request.form.get("voice", "male")
    speak(chatbotMessage, voice)
    return render_template('index.html')



@app.route('/data', methods=['POST'])
def get_data():

    data = request.get_json()
    language=data.get('data1')
    topic=data.get('data2')
    openai.api_key = API
    

    try:
        response = openai.Completion.create(
        model="text-davinci-003",
        prompt=f"Generate code for me in the {language} programming language, specifically tailored to the {topic} you have in mind.",
        temperature=0.1,
        max_tokens=256,
        top_p=1,
        frequency_penalty=0,
        presence_penalty=0
        )
       
        model_reply = response['choices'][0]['text']
        chatbotMessage="I am currently in the process of crafting the code on your behalf."
        voice = request.form.get("voice", "male")
        speak(chatbotMessage, voice)
        print(response,model_reply)
        return jsonify({"response":True,"message":model_reply})
    except Exception as e:
        print(e)
        error_message = f'Error: {str(e)}'
        return jsonify({"message":error_message,"response":False})

    

if __name__ == '__main__':
    app.run()