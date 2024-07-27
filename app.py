import os
from flask import Flask, render_template, request, jsonify, make_response
from servicehelper.inventory_predict import predict_inventory
app = Flask(__name__)

# Define the upload folder and ensure it exists
UPLOAD_FOLDER = 'uploads'
if not os.path.exists(UPLOAD_FOLDER):
    os.makedirs(UPLOAD_FOLDER)

# Configuration for the Flask app
app.config['UPLOAD_FOLDER'] = UPLOAD_FOLDER

# Render index.html initially
@app.route('/')
def render_index():
    return render_template('index.html')

@app.route('/inventory')
def antika():
    return render_template('index2.html')

# Handle image uploads
@app.route('/upload', methods=['POST'])
def upload_images():
    if 'images' not in request.files:
        return jsonify({'error': 'No file part'}), 400

    files = request.files.getlist('images')

    if not files:
        return jsonify({'error': 'No selected files'}), 400

    file_urls = []
    for file in files:
        filename = file.filename
        file_path = os.path.join(app.config['UPLOAD_FOLDER'], filename)
        file.save(file_path)
        file_urls.append(file_path)

    # Call predict_inventory with the saved file paths
    prediction_result = predict_inventory(file_urls)

    return jsonify({'file_urls': file_urls, 'prediction': prediction_result})

# Set port to 3900
port = 3900

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=port)
