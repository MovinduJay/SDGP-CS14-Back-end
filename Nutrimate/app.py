import streamlit as st
import io
import os
from PIL import Image
import datetime

import torch
import pathlib

pathlib.PosixPath = pathlib.WindowsPath

model = torch.hub.load('ultralytics/yolov5', 'custom', path='best.pt', force_reload=True)
model.eval()

DATETIME_FORMAT = "%Y-%m-%d_%H-%M-%S-%f"

st.title("Food Object Detection App")

uploaded_file = st.file_uploader("Choose an image file", type=["jpg", "jpeg", "png"])

if uploaded_file is not None:
    img_bytes = uploaded_file.read()
    img = Image.open(io.BytesIO(img_bytes))

    results = model([img])
    results.render()  # Updates results.imgs with boxes and labels

    now_time = datetime.datetime.now().strftime(DATETIME_FORMAT)
    img_savename = f"static/{now_time}.png"
    Image.fromarray(results.ims[0]).save(img_savename)

    st.image(img_savename, caption="Image with detected objects")