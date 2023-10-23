from flask import Flask, request, redirect
from pytube import Playlist

app = Flask(__name)

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

