# REST APIを作る
TypeScriptとNode.jsを使用して、REST APIを
作成します。

## ローカルで構築環境
- 以下のコマンドを実行する
1. プロジェクトを作成する
```
mkdir shopping-api
cd shopping-api
```
2. package.jsonを作成
```
npm init -y
```
3. 必要なパッケージをインストール
```
npm install express typescript ts-node @types/node @types/express
```
4. TypeScript の設定ファイル tsconfig.json を作成します。
```
tsc --init
```
5. src ディレクトリを作成し、app.ts と routes.ts ファイルを作成
```
mkdir src
touch src/app.ts src/routes.ts
```
6. package.jsonを設定する
```json
{
  "name": "shopping-api",
  "version": "1.0.0",
  "description": "",
  "main": "index.js",
  "scripts": {
    "start": "nodemon --exec ts-node src/app.ts",
    "build": "tsc",
    "serve": "node dist/app.js"
  },
  "keywords": [],
  "author": "",
  "license": "ISC",
  "dependencies": {
    "@types/cors": "^2.8.13",
    "@types/express": "^4.17.13",
    "@types/node": "^16.11.12",
    "cors": "^2.8.5",
    "express": "^4.17.1",
    "ts-node": "^10.4.0",
    "typescript": "^4.5.4"
  },
  "devDependencies": {
    "nodemon": "^2.0.22"
  }
}
```
7. nodemonを使って開発環境でサーバーを自動で再起動
```
npm install --save-dev nodemon
```
8. こちらのURLからデータを取得<br>
http://localhost:3000/shopping

## Dockerで使用する
DockerDesktopを起動しておく。

1. Dockerfileを作成します:
プロジェクトのルートディレクトリにDockerfileという名前のファイルを作成し、次の内容を記述します。

Dockerfile
```
# ベースイメージとして公式のNode.jsイメージを使用
FROM node:16

# 作業ディレクトリを設定
WORKDIR /app

# package.jsonとpackage-lock.jsonをコピー
COPY package*.json ./

# 依存関係をインストール
RUN npm install

# プロジェクトのソースコードをコピー
COPY . .

# TypeScriptをJavaScriptにコンパイル
RUN npm run build

# ポートを公開
EXPOSE 3000

# コンテナが起動する際に実行されるコマンド
CMD ["npm", "run", "serve"]
```

2. .dockerignoreファイルを作成します:
不要なファイルやディレクトリをDockerイメージに含めないようにするため、プロジェクトのルートディレクトリに.dockerignoreファイルを作成し、次の内容を記述します。
```
node_modules
dist
.dockerignore
Dockerfile
```
3. Dockerイメージをビルドします:
プロジェクトのルートディレクトリで、次のコマンドを実行してDockerイメージをビルドします。イメージ名は任意で、ここではmy-rest-apiとしています。
```
docker build -t my-rest-api .
```
4. Dockerコンテナを起動します:
ビルドが完了したら、次のコマンドを実行してDockerコンテナを起動します。ポート番号は適宜変更してください。
```
docker run -p 3000:3000 --name my-rest-api-container my-rest-api
```
以上で、Dockerコンテナ内でREST APIが実行されます。APIにアクセスするには、ホストマシンのhttp://localhost:3000にアクセスしてください。
5. 停止するときのコマンド
```
docker stop my-rest-api-container
```
6. 再起動するときは、こちらを実行
```
docker restart my-rest-api-container
```