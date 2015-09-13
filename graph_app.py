#!flask/bin/python

#imports
from flask import Flask, request, render_template, jsonify
import json

#flask instance
app = Flask(__name__)
app.config.from_object(__name__)

@app.route('/', methods = ['GET', 'POST'])
def color() :
    if request.method == 'GET' :
        return render_template('graph.html')
    else :
        final = {}
        adj_list = json.loads(request.form['adj_list'])
        color_list = ['red', 'orange', 'yellow', 'green', 'blue']
        for node in adj_list:
            ac=find(node['node'], adj_list)
            i=0
            done=False
            while done == False and i < len(color_list):
                if color_list[i] in ac:
                    done=False
                    i=i+1
                else:
                    done=True
                    final[node['node']] = color_list[i]
        return jsonify({1:adj_list})

def find(node, adj_list):
    vlist=[]
    for elem in adj_list:
        if node in elem['adj_nodes']:
            vlist.append(elem['color'])
    return vlist

if __name__ == '__main__' :
    app.run(debug = True)
