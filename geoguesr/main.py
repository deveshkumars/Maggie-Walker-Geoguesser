#so much exciting

from flask import render_template, Flask

app = Flask("app")


@app.route('/leaderboard')
def leaderboard():
    return render_template("leaderboard.html")

@app.route('/settings')
def settings():
    return render_template("settings.html")

@app.route("/")
def home():
    return render_template("index.html")
    

app.run(host="0.0.0.0", port=8000)

usernames = []
scores = []
