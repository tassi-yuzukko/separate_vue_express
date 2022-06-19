## 想定実行環境
* Windows 10 WSL2
    * Ubuntu 20.04

## 必要なモジュール
* nodejs
* npm
* sqlite3 →インストール方法： https://coffee-nominagara.com/wsl-ubuntu20-04-sqlite3-install

### npm でグローバル（-g）でインストールしておくもの
* yarn
* typescript
* ts-node

## 実行方法
``` bash
yarn node --loader ts-node/esm index.ts
```

上記については、いろいろ問題が起きたりしたので、以下の症状が起きた場合は https://coffee-nominagara.com/node-index-ts-syntaxerror-cannot-use-import-statement-outside-a-module を参照。

* `SyntaxError: Cannot use import statement outside a module` というエラーがでる
* `TypeError [ERR_UNKNOWN_FILE_EXTENSION]: Unknown file extension ".ts"` というエラーがでる
* `ReferenceError: exports is not defined in ES module scope` というエラーがでる