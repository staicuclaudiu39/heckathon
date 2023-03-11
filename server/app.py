from flask import Flask, jsonify, render_template, request
from flask_cors import CORS
import flask_login
import flask_admin
import flask_wtf
import os
import replicate

from flask_pymongo import PyMongo

from config import Config

app = Flask(__name__)
CORS(app, resources={r"/api/*": {"origins": "*", "headers": "Content-Type"}})
app.config.from_object(Config)


mongo = PyMongo(app)

# Home route
@app.route("/", methods=["GET", 'POST'])
def home():
    """
    Home page route
    """
    if request.method == 'POST':
        message = request.form['message']
        return jsonify(your_message=message)
    return render_template("index.html")

# Helpers
def textToImage(text):
    os.environ['REPLICATE_API_TOKEN'] = '40c55e97d7f9d9ecc8e16b00d1195109b07393a3'
    api_token = os.environ.get('REPLICATE_API_TOKEN')

    client = replicate.Client(api_token=api_token)

    model = replicate.models.get("stability-ai/stable-diffusion")
    version = model.versions.get(
        "db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf")

    # https://replicate.com/stability-ai/stable-diffusion/versions/db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf#input
    inputs = {
        # Input prompt
        'prompt': text,

        # pixel dimensions of output image
        'image_dimensions': "768x768",

        # Specify things to not see in the output
        # 'negative_prompt': ...,

        # Number of images to output.
        # Range: 1 to 4
        'num_outputs': 1,

        # Number of denoising steps
        # Range: 1 to 500
        'num_inference_steps': 50,

        # Scale for classifier-free guidance
        # Range: 1 to 20
        'guidance_scale': 7.5,

        # Choose a scheduler.
        'scheduler': "DPMSolverMultistep",

        # Random seed. Leave blank to randomize the seed
        # 'seed': ...,
    }

    # https://replicate.com/stability-ai/stable-diffusion/versions/db21e45d3f7023abc2a46ee38a23973f6dce16bb082a930b0c49861f96d1e5bf#output-schema
    output = version.predict(**inputs)
    print(output)
    return output

# Request image route
@app.route('/api/submit', methods=['POST'])    
def submit():
    input_data = request.json.get('text')
    output_data = textToImage(input_data)
    # result = {'status': 'success'}
    return jsonify(output_data)


if __name__ == "__main__":
    app.run(debug=True, host="0.0.0.0")
