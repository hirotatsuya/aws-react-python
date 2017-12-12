import requests

def lambda_handler(event, context):
  endpoint = 'https://api.bitflyer.jp'
  path = event
  response = requests.get(endpoint + path)
  return response.text
