## 想定環境
以下がグローバルインストールされていることが前提です。

* node
* npm
* yarn（たぶん不要な気もする）
* typescript
* ts-node

## 技術スタック
* express
    * Webサーバーとして動作させるために便利なフレームワーク。具体的に、get や post といった WebAPI の URI 解析等をブラックボックス化してくれたりといった、直感的な WebAPI を作成しやすくなる
* ts-node
    * typescript をコンパイルするのに必要？っぽい
* activedirectory
    * LDAP 認証をするために必要
* dotenv
    * 実行環境の環境変数を汚すことなく、環境変数を使用して処理できるためのライブラリ。具体的に、外部ファイル（`.env`）に環境変数の設定を格納することで、ソース内では環境変数から値を取得する方法で外部ファイルの設定をロードできる
* winston
    * ログ出力用ライブラリ

## ディレクトリ構成
ベースとなるディレクトリ構成は https://github.com/santiq/bulletproof-nodejs を参考にしている

日本語解説サイトはこちら → https://qiita.com/baby-degu/items/f1489dd94becd46ab523

## 実行方法
```bash
npm run start
```


