from pytube import YouTube
from flask import Flask, session, url_for, send_file, render_template, redirect, request
from io import BytesIO

app = Flask(__name__)
app.config["SECRET_KEY"] = "my_secret_key"

@app.route("/", methods=["POST", "GET"])
def index():
    if request.method == "POST":
        session["link"] = request.form.get("url")
        url = YouTube(session["link"])
        url.check_availability()
        return render_template("download.html", url=url)

    return render_template('index.html')
@app.route('/download', methods=['GET'])
def download_playlist():
    playlist_url = request.args.get('url')  # Get the 'url' parameter from the URL
    if not playlist_url:
        return "Please provide a valid playlist URL."

    try:
        playlist = Playlist(playlist_url)
        # Download all the videos from the playlist
        for video_url in playlist.video_urls:
            yt = YouTube(video_url)
            audio_stream = yt.streams.filter(only_audio=True).first()
            audio_stream.download(output_path='/path/to/save/audio')

        return "Playlist downloaded successfully!"
    except Exception as e:
        return f"An error occurred: {str(e)}"

if __name__ == '__main__':
    app.run()

