import requests
from bs4 import BeautifulSoup as bs
import re
import slackweb

def lambda_handler(event, context):
  slack = slackweb.Slack(url="https://hooks.slack.com/services/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")
  target_url = "https://www.yahoo.co.jp/"
  r = requests.get(target_url)
  soup = bs(r.text, 'html.parser')
  els = soup.find_all(href=re.compile("news.yahoo.co.jp/pickup"))
  message = '*Yahooトップニュース*'
  for e in els:
    message += '\n' + e.getText()
  slack.notify(text=message, mrkdwn=True)