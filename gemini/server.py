import google.generativeai as genai
from flask import Flask, render_template, request, jsonify

app = Flask(__name__, static_folder='static')  # Serve static files from the 'static' folder

# Set up Gemini API
genai.configure(api_key="AIzaSyDosetvVyzW7ny6Hvg1G4JKYMyD60OLwIE")
model = genai.GenerativeModel("gemini-pro")

@app.route("/")
def home():
    return render_template("index.html")

@app.route("/get", methods=["POST"])
def chatbot():
    user_message = request.json.get("message")
    
    response = model.generate_content(user_message)
    bot_reply = response.text.strip()

    return jsonify({"response": bot_reply})

if __name__ == "__main__":
    app.run(debug=True)
