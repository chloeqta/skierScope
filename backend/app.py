from flask import Flask, request, jsonify, send_from_directory
from flask_cors import CORS
import os
from utils.process_video import process_vid

app = Flask(__name__)
CORS(app)

@app.route('/process_video', methods=['POST'])
def process_video_endpoint():
    try:
        if 'video' not in request.files:
            return jsonify({"error": "No video file uploaded"}), 400

        file = request.files['video']
        fileName = file.filename
        filePath = os.path.join('temp_videos', fileName)
        file.save(filePath)

        outputPath = os.path.join("output_videos", fileName + "_processed.mp4")
        outputVid = process_vid(filePath, outputPath)
        return jsonify({"message": "Video processed successfully", "output_url": outputPath}), 200

    except Exception as e:
        print("ERROR: ", str(e))
        return jsonify({"error": str(e)}), 500

@app.route('/output_videos/<filename>')
def download_processed_video(filename):
    try:
        print("TRYING TO SEND: ", filename)
        return send_from_directory('output_videos', filename)
    except Exception as e:
        raise Exception(f"Failed to load processed video: {str(e)}")

if __name__ == '__main__':
    app.run(debug=True)