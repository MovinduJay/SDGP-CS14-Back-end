# import argparse
# import io
# import os
# import pathlib
# from PIL import Image
# import datetime

# import torch
# from flask import Flask, render_template, request, redirect

# app = Flask(__name__)

# DATETIME_FORMAT = "%Y-%m-%d_%H-%M-%S-%f"

# pathlib.PosixPath = pathlib.WindowsPath

# model = torch.hub.load('ultralytics/yolov5', 'custom', path='best.pt')
# model.eval()

# @app.route("/", methods=["GET", "POST"])
# def predict():
#     if request.method == "POST":
#         if "file" not in request.files:
#             return redirect(request.url)
#         file = request.files["file"]
#         if not file:
#             return

#         img_bytes = file.read()
#         img = Image.open(io.BytesIO(img_bytes))
#         results = model([img])

#         results.render()  # updates results.imgs with boxes and labels
#         now_time = datetime.datetime.now().strftime(DATETIME_FORMAT)
#         img_savename = f"static/{now_time}.png"
#         Image.fromarray(results.ims[0]).save(img_savename)

#         # Get the identified object name
#         identified_object = results.names[int(results.xyxy[0][0][-1])]
#         print(f"Identified object: {identified_object}")

#         return redirect(img_savename)
#     return render_template("index.html")


# if __name__ == "__main__":
#     parser = argparse.ArgumentParser(description="Flask app exposing yolov5 models")
#     parser.add_argument("--port", default=5000, type=int, help="port number")
#     args = parser.parse_args()

#     app.run(host="0.0.0.0", port=args.port)  # debug=True causes Restarting with stat

import argparse
import io
import os
import pathlib
from PIL import Image
import datetime
import torch
from flask import Flask, request, redirect, jsonify
import base64
from flask_cors import CORS  # Import CORS

app = Flask(__name__)
CORS(app)  # Enable CORS for all routes

DATETIME_FORMAT = "%Y-%m-%d_%H-%M-%S-%f"

pathlib.PosixPath = pathlib.WindowsPath

model = torch.hub.load('ultralytics/yolov5', 'custom', path='best.pt')
model.eval()

@app.route("/save_photo", methods=["POST"])
def save_photo():
    if request.method == "POST":
        if "image" not in request.json:
            return jsonify({'error': 'No image data'})

        image_data = request.json["image"]
        image_bytes = io.BytesIO(base64.b64decode(image_data))

        now_time = datetime.datetime.now().strftime(DATETIME_FORMAT)
        img_savename = f"static/{now_time}.png"
        Image.open(image_bytes).save(img_savename)

        return jsonify({'success': True, 'file_path': img_savename})

    return jsonify({'error': 'Invalid request'})

@app.route("/predict", methods=["POST"])
def predict():
    if request.method == "POST":
        if "image_path" not in request.json:
            return jsonify({'error': 'No image path'})

        image_path = request.json["image_path"]
        img = Image.open(image_path)
        results = model([img])

        results.render()  # updates results.imgs with boxes and labels

        # Get the identified object name
        identified_object = results.names[int(results.xyxy[0][0][-1])]
        print(f"Identified object: {identified_object}")

        # Delete the image file after prediction
        os.remove(image_path)

        return jsonify({'detected_object': identified_object})

    return jsonify({'error': 'Invalid request'})

if __name__ == "__main__":
    parser = argparse.ArgumentParser(description="Flask app exposing yolov5 models")
    parser.add_argument("--port", default=5000, type=int, help="port number")
    args = parser.parse_args()

    app.run(host="0.0.0.0", port=args.port)  # debug=True causes Restarting with stat
