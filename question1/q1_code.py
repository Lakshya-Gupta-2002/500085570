from flask import Flask, request, jsonify
import requests
import json

app = Flask(_name_)

@app.route('/numbers', methods=['GET'])
def get_numbers():
    urls = request.args.getlist('url')
    numbers = []

    def fetch_url(url):
        try:
            response = requests.get(url, timeout=0.5)
            if response.status_code == 200:
                return response.json().get("numbers", [])
            else:
                return []
        except (requests.RequestException, json.JSONDecodeError):
            return []

    # Fetch all URLs concurrently
    from concurrent.futures import ThreadPoolExecutor
    with ThreadPoolExecutor() as executor:
        numbers_lists = list(executor.map(fetch_url, urls))
    
    # Merge all numbers
    for nums in numbers_lists:
        numbers.extend(nums)
    
    # Deduplicate and sort
    numbers = sorted(list(set(numbers)))

    return jsonify({"numbers": numbers})

if _name_ == '_main_':
    app.run(debug=True, port=8008)
