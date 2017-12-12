# send_slack_lambda
from send_slack_lambda import lambda_function
lambda_function.lambda_handler("tmp", "tmp")

# get_news_lambda
from get_news_lambda import lambda_function
lambda_function.lambda_handler("tmp", "tmp")

# get_price_lambda
from get_price_lambda import get_price_function
price = get_price_function.get_price_handler("tmp", "tmp")
print(price)
