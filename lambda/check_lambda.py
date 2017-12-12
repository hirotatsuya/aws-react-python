# from send_slack_lambda import lambda_function
# from get_news_lambda import lambda_function
# from get_price_lambda import lambda_function
from get_markets_lambda import lambda_function

markets = lambda_function.lambda_handler("/v1/markets", "tmp")
print(markets)
