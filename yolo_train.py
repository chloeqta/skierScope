from ultralytics import YOLO
# import matplotlib

# matplotlib.use('TkAgg')
model = YOLO("yolov8n.pt")  # load a pretrained model (recommended for training)
model.train(data="config.yaml", epochs=500)  # train the model
model.export(format="onnx", opset=12)