import os
from flask import Flask, render_template, make_response, send_from_directory

app = Flask(__name__)

# Render index.html initially
@app.route('/')
def render_index():
    return render_template('index.html')

@app.route('/inventory')
def antika():
    return render_template('index2.html')

# Set port to 3900
port = 3900

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port)
