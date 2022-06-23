# import requirements needed
from flask import Flask, request, redirect, url_for, render_template, session
from utils import get_base_url

from aitextgen import aitextgen
import os

ai = aitextgen(model_folder="model/",
               tokenizer_file="model/aitextgen.tokenizer.json", to_gpu=False)

# setup the webserver
# port may need to be changed if there are multiple flask servers running on same server
port = 12345
base_url = get_base_url(port)

# if the base url is not empty, then the server is running in development, and we need to specify the static folder so that the static files are served
if base_url == '/':
    app = Flask(__name__)
else:
    app = Flask(__name__, static_url_path=base_url+'static')

# set up the routes and logic for the webserver

"""
1. Copy and paste the home function right below the home function.
2. /generate
"""

@app.route(f'{base_url}')
def home():
    return render_template('index.html')

@app.route(f'{base_url}/generate', methods = ["POST"])
def generate():

    prompt = request.form['promptForm']
    temperature = float(request.form['temp']) if len(request.form['temp']) > 0 else 0.7
    print(temperature)
    max_length = int(request.form['length']) if len(request.form['length']) > 0 else 200
    print(max_length)
    
    newstring = ''
    
    generated_code = ai.generate_one(prompt = prompt, temperature = temperature, max_length = max_length)
    
    n = generated_code.split('\n')
    
    strippedlines = [line for line in n if line.strip() != ""]
    
    codefile = open('bluepythontest.py', 'w')
    
    for line in strippedlines:
        codefile.write(line)
        
    codefile.close()
    
    os.system("autopep8 -i bluepythontest.py")
    
    
    generated_code = open('bluepythontest.py', 'r')
    
    
    newstring = ""
    for line in generated_code.readlines():
        newstring += line
    
    
    #print(generated_code.split('\n'))
    print(newstring)
    return render_template('generate.html', data = newstring)




# define additional routes here
# for example:
# @app.route(f'{base_url}/team_members')
# def team_members():
#     return render_template('team_members.html') # would need to actually make this page

if __name__ == '__main__':
    # IMPORTANT: change url to the site where you are editing this file.
    website_url = 'cocalc2.ai-camp.dev' # Put the name of the server url you're on in here
    
    print(f'Try to open\n\n    https://{website_url}' + base_url + '\n\n')
    app.run(host = '0.0.0.0', port=port, debug=True)
