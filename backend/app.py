from flask import Flask, request, jsonify
from flask_cors import CORS  # Import CORS
import os
from utils.process_video import process_vid
from utils.constants import MODEL_PATH

app = Flask(__name__)
CORS(app)


@app.route('/process_video', methods=['POST'])
def process_video_endpoint():
    try:
        if 'video' not in request.files:
            return jsonify({"error": "No video file uploaded"}), 400

        video_file = request.files['video']
        video_name = video_file.filename
        video_path = os.path.join('temp_videos', video_name)
        video_file.save(video_path)

        output_path = os.path.join("output_videos", video_name + "_processed.mp4")
        output_vid = process_vid(video_path, output_path, MODEL_PATH)

        processed_video_url = f"/output_videos/{video_name}_processed.mp4"
        return jsonify({"message": "Video processed successfully", "output_url": processed_video_url}), 200

    except Exception as e:
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)