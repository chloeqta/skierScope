from flask import Flask, request, jsonify, send_file
from flask_cors import CORS
import io
from utils.process_video import process_video
from utils.constants import MODEL_PATH

app = Flask(__name__)
CORS(app)


@app.route('/process_video', methods=['POST'])
def apply_model():
    try:
        if 'video' not in request.files:
            return jsonify({"error": "No video file uploaded"}), 400

        video_file = request.files['video']

        # Process the video in memory
        inptVid = io.BytesIO()  # In-memory file-like object
        video_file.save(inptVid)  # Simulate saving the file
        inptVid.seek(0)  # Rewind to the start of the file

        # Process the video in memory, passing BytesIO as both input and output
        outptVid = io.BytesIO()  # In-memory file-like object for the processed video
        process_video(inptVid, outptVid)

        outptVid.seek(0)  # Rewind to the start of the file before sending

        # Send the processed video back to the frontend
        return send_file(outptVid, mimetype='video/mp4', as_attachment=False, download_name='processed_video.mp4')

    except Exception as e:
        print("error:", str(e))
        return jsonify({"error": str(e)}), 500



if __name__ == '__main__':
    app.run(debug=True)