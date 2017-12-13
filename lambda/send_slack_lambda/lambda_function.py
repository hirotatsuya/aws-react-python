import requests
from bs4 import BeautifulSoup
import slackweb
from datetime import datetime, timedelta

slack = slackweb.Slack(url='https://hooks.slack.com/services/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')
target_url = 'https://bitflyer.jp/ja-jp'

def get_datetime():
  value = datetime.now() + timedelta(hours=9)
  return value.strftime('%Y/%m/%d %H:%M:%S')

def lambda_handler(event, context):
  response = requests.get(target_url)
  soup = BeautifulSoup(response.text, 'html.parser')
  ask = soup.find(id='bfPriceAsk_1').text
  bid = soup.find(id='bfPriceBid_1').text
  ask_value = 'ASK: `' + ask + '`BTC'
  bid_value = 'BID: `' + bid + '`BTC'
  title = '*Scraping by bitflyer*'
  now = '_' + get_datetime() + '_'
  value = title + '\n' + now + '\n' + ask_value + '\n' + bid_value
  slack.notify(text=value, mrkdwn=True)
