import requests
import xml.etree.ElementTree as ET
from flask import Flask, jsonify, render_template

app = Flask(__name__)

@app.route('/')
def index():
    return render_template('index.html')

@app.route('/api/notes')
def get_notes():
    url = 'https://docs.cloud.google.com/feeds/bigquery-release-notes.xml'
    response = requests.get(url)
    if response.status_code != 200:
        return jsonify({'error': 'Failed to fetch release notes'}), 500
    
    root = ET.fromstring(response.content)
    ns = {'atom': 'http://www.w3.org/2005/Atom'}
    
    notes = []
    for entry in root.findall('atom:entry', ns):
        title_elem = entry.find('atom:title', ns)
        title = title_elem.text if title_elem is not None else 'No Title'
        
        link_elem = entry.find('atom:link', ns)
        link = link_elem.attrib['href'] if link_elem is not None else '#'
        
        content_elem = entry.find('atom:content', ns)
        content = content_elem.text if content_elem is not None else ''
        
        updated_elem = entry.find('atom:updated', ns)
        updated = updated_elem.text if updated_elem is not None else ''
        
        notes.append({
            'title': title,
            'link': link,
            'content': content,
            'updated': updated
        })
    return jsonify(notes)

if __name__ == '__main__':
    app.run(debug=True, port=5000)
