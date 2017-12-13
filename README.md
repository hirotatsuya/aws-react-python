aws-react-python
============

## Description
```
【AWSの勉強】
1. Lambdaによるサーバレスな仕組みの構築
   CloudWatchにより定期的にLambda関数を実行する仕組み
   関数はbitflyerのサイトからビットコインの値段をスクレイピングしてslackに通知
   Lambdaにアップロードする関数はpythonで記述
2. Cognitoによる認証の仕組みの構築
   認証後のページでAPIGatewayによる関数を実行する仕組み
   アプリケーションはjavascriptで記述
   ライブラリはReactを使用
3. S3にホスティング
```

## Requirements
- python 3.6.3
- pip 9.0.1
- pipenv 9.0.0
- node 8.2.1
- npm 4.0.5
- yarn 1.3.2
- aws-cli 1.14.5

## First
- `yarn`のインストール

```
npm i -g yarn
```

- `pipenv`のインストール

```
pip install pipenv
```

- `aws-cli`のインストール

```
pip install awscli
```

- `aws-cli`のセットアップ
  - アクセスキーID, シークレットアクセスキー, region, formatの設定

```
aws configure
```


## Setup
- nodeのパッケージのインストール

```
yarn
```

- pythonのパッケージのインストール

```
pipenv install
```

- Lambdaにアップロードするためのライブラリのインストール

```
pip install -r ./requirements.txt -t .
```


## Usage
- python関数の実行

```
python check_lambda.py
```

- 仮想環境でpython関数の実行

```
pipenv run python check_lambda.py
```

- `webpack-dev-server`を起動して、`localhost:4000`にアクセスできるようにする

```
yarn start
```

- ポート番号を指定して`webpack-dev-server`を起動しアクセスできるようにする

```
PORT=(target_port) yarn start
```

- `fish`時の環境変数の設定

```
env PORT=(target_port) yarn start
```

- 開発環境でビルドを行い、`dist`ディレクトリに`icons`ディレクトリと`index.html`と`main.css`と`bundle.js`を生成する

```
yarn build
```

- 本番環境でビルドを行い、`dist`ディレクトリに`icons`ディレクトリと`index.html`と`main.css`と`bundle.js`を生成する

```
APP_ENV=production yarn build
```

- `fish`時の環境変数の設定

```
env APP_ENV=production yarn build
```

- `s3`にファイルをアップロードし、`http://aws-react-python.s3-website-ap-northeast-1.amazonaws.com/`にアクセスできるようにする

```
yarn host
```
