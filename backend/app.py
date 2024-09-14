from flask import Flask, request, jsonify
import os
from utils.process_video import process_vid
from utils.constants import MODEL_PATH

app = Flask(__name__)

@app.route('/process_video', methods=['POST'])
def process_video_endpoint():
    try:
        data = request.json
        video_name = data.get('video_name')
        root_path = data.get('root_path', 'yolo/data/videos/')
        
        if not video_name:
            return jsonify({"error": "Missing video_name"}), 400

        file_path = os.path.join(root_path, video_name + ".mp4")
        output_path = os.path.join("output_videos/", video_name + "_processed.mp4")

        output_vid = process_vid(file_path, output_path, MODEL_PATH)

        return jsonify({"message": "Video processed successfully", "output_path": output_vid}), 200
    
    except Exception as e:
        return jsonify({"error": str(e)}), 500


if __name__ == '__main__':
    app.run(debug=True)
