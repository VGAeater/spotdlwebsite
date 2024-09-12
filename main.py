from flask import Flask, send_file, stream_with_context
import subprocess, os

app = Flask(__name__)

log = open('log.txt', 'a')

@app.route('/')
def index():
    return send_file('index.html')

@app.route('/add/<path:spoturl>')
def getSpotify(spoturl):
    def execute():
        yield "Starting\n"
        popen = subprocess.Popen(["spotdl", spoturl], stdout=subprocess.PIPE, stderr=log, universal_newlines=True, cwd="/home/strat/Music")
        for stdout_line in iter(popen.stdout.readline, ""):
            yield stdout_line 
        popen.stdout.close()
    return app.response_class(stream_with_context(execute()))

if __name__ == '__main__':
    app.run(host='0.0.0.0', port=5000)
