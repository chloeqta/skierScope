import cv2

INPUT_WIDTH = 640
INPUT_HEIGHT = 640
padding = 0
color = (0, 176, 80)

model = "runs/detect/train7/weights/best.onnx"
root_path = "data/videos/"
video_name = "chloe_skiing"
file_path = root_path + video_name + ".mp4"
output_path = "output/" + video_name + "_processed.mp4"

net = cv2.dnn.readNetFromONNX(model)
vid = cv2.VideoCapture(file_path)

if not vid.isOpened():
    print("Error opening video")

frame_w = int(vid.get(3))
frame_h = int(vid.get(4))

# VideoWriter object to save the processed video
out = cv2.VideoWriter(output_path, cv2.VideoWriter_fourcc(*'mp4v'), 30, (frame_w, frame_h))

while True:
    ret, frame = vid.read()
    if not ret:
        break
    blob = cv2.dnn.blobFromImage(frame, 1 / 255, (INPUT_WIDTH, INPUT_HEIGHT))
    net.setInput(blob)
    outs = net.forward()[0].T
    boxes = outs[:, :4]
    confidences = outs[:, 4]
    indexes = cv2.dnn.NMSBoxes(boxes, confidences, 0.5, 0.4)

    scale_x = frame.shape[1] / INPUT_WIDTH
    scale_y = frame.shape[0] / INPUT_HEIGHT

    for i in indexes:
        coords = boxes[i]
        xmin = max(int(scale_x * (coords[0] - coords[2] / 2)), 1) + padding
        xmax = min(int(scale_x * (coords[0] + coords[2] / 2)), frame.shape[1] - 1) - padding
        ymin = max(int(scale_y * (coords[1] - coords[3] / 2)), 1) + padding
        ymax = min(int(scale_y * (coords[1] + coords[3] / 2)), frame.shape[0] - 1) - padding
        confidence = confidences[i]

        cv2.rectangle(frame, (xmin, ymin), (xmax, ymax), color, 3)
        cv2.putText(frame, 'skier ' + str(round(confidence, 3)), (xmin, ymin - 5), cv2.FONT_HERSHEY_SIMPLEX, 0.5, color, 2)

    out.write(frame)  # Write each processed frame to the output video

    # cv2.imshow("output", frame)
    if cv2.waitKey(25) & 0xFF == ord('q'):
        break

vid.release()
out.release()  # Make sure to release the video writer
cv2.destroyAllWindows()
