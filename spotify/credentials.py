import os
from dotenv import load_dotenv

load_dotenv()

CLIENT_ID = os.getenv('CLIENT_ID')
CLIENT_SECRET = os.getenv('CLIENT_SECRET')
REDIRECT_URI = "https://spotifypartycontroller.dillonb07.repl.co/spotify/redirect" # Replit
# REDIRECT_URI = "http://127.0.0.1:8000/spotify/redirect" # Localhost port 8000
# REDIRECT_URI = "http://0.0.0.0:8000/spotify/redirect" # Network host port 8000
