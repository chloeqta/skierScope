import cv2
import numpy as np
import imageio
from .constants import INPUT_WIDTH, INPUT_HEIGHT, PADDING, BOX_COLOR, MODEL_PATH

def load_model(modelPath):
    try:
        net = cv2.dnn.readNetFromONNX(modelPath)
        return net
    except Exception as e:
        raise Exception(f"Failed to load model: {str(e)}")

def get_box_coords(frame, boxes, scale_x, scale_y, i):
    coords = boxes[i]
    xmin = max(int(scale_x * (coords[0] - coords[2] / 2)), 1) + PADDING
    xmax = min(int(scale_x * (coords[0] + coords[2] / 2)), frame.shape[1] - 1) - PADDING
    ymin = max(int(scale_y * (coords[1] - coords[3] / 2)), 1) + PADDING
    ymax = min(int(scale_y * (coords[1] + coords[3] / 2)), frame.shape[0] - 1) - PADDING
    return xmin, xmax, ymin, ymax

def apply_model_to_frame(frame, net):
    blob = cv2.dnn.blobFromImage(frame, 1 / 255, (INPUT_WIDTH, INPUT_HEIGHT))
    net.setInput(blob)
    outs = net.forward()[0].T
    boxes, confidences = outs[:, :4], outs[:, 4]
    indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)

    scaleX, scaleY = frame.shape[1] / INPUT_WIDTH, frame.shape[0] / INPUT_HEIGHT

    for i in indexes:
        xmin, xmax, ymin, ymax = get_box_coords(frame, boxes, scaleX, scaleY, i)
        confidence = confidences[i]
        cv2.rectangle(frame, (xmin, ymin), (xmax, ymax), BOX_COLOR, 3)
        cv2.putText(frame, 'skier ' + str(round(confidence, 3)), (xmin, ymin - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, BOX_COLOR, 2)
    return frame

def process_video(inptVidIo, outptVidIo):
    net = load_model(MODEL_PATH)
    reader = imageio.get_reader(inptVidIo, format='mp4')
    # Get video metadata
    meta = reader.get_meta_data()
    frameW, frameH = meta['size']
    fps = meta['fps']

     # Create an OpenCV VideoWriter to write processed frames
    writer = imageio.get_writer(outptVidIo, format='mp4', fps=fps)

    # Process each frame
    for frame in reader:
        frame = cv2.cvtColor(frame, cv2.COLOR_RGB2BGR)  # Convert from RGB to BGR (OpenCV format)
        processedFrame = apply_model_to_frame(frame, net)
        processedFrame = cv2.cvtColor(processedFrame, cv2.COLOR_BGR2RGB)  # Convert back to RGB
        writer.append_data(processedFrame)

    # Close the reader and writer
    reader.close()
    writer.close()

    # Rewind the output video buffer to the start
    outptVidIo.seek(0)

"""
def process_image(input_image_path, output_image_path):
    net = load_model(MODEL_PATH)
    frame = cv2.imread(input_image_path)
    if frame is None:
        raise Exception(f"Failed to read image: {input_image_path}")
    processed_frame = apply_model_to_frame(frame, net)
    cv2.imwrite(output_image_path, processed_frame)
"""
