# from send_slack_lambda import lambda_function
# from get_news_lambda import lambda_function
# from get_price_lambda import lambda_function
from bitflyer_public_lambda import lambda_function
# from bitflyer_private_lambda import lambda_function

# lambda_function.lambda_handler("tmp", "tmp")

event = {
  "path": "/v1/markets"
}
value = lambda_function.lambda_handler(event, "tmp")
print(value)

