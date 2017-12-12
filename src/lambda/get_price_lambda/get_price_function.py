import requests
from bs4 import BeautifulSoup as bs

def get_price_handler(event, context):
  endpoint = 'https://bitflyer.jp/'
  res = requests.get(endpoint)
  soup = bs(res.text, 'html.parser')
  price = soup.find(id='bfPriceMid').text
  return price