from gtts import gTTS
import os

def read_article_with_gtts(text, lang='en', filename='article.mp3'):
    tts = gTTS(text=text, lang=lang)
    tts.save(filename)
    # This example uses a system command to play the file (ensure you have a player like mpg321 installed)
    os.system(f"mpg321 {filename}")

import pyttsx3

def read_article_with_pyttsx3(text):
    engine = pyttsx3.init()
    engine.say(text)
    engine.runAndWait()
