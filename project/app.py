from flask import Flask, jsonify
import pandas as pd

app = Flask(__name__)

# Load the Kaggle dataset
data = pd.read_csv('flood.csv')  # Ensure this file is in the same folder as app.py

@app.route('/flood', methods=['GET'])  # Ensure this matches the URL you want to visit
def get_flood_data():
    sample = data.sample(1).to_dict(orient='records')[0]
    return jsonify(sample)

if __name__ == "__main__":
    app.run(debug=True)