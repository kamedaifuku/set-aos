# AOS を利用する際のスクリプトサンプル

AOS.js を利用する際のサンプルコードです。
サンプルでは CDN の利用を想定していますが、ローカルにファイルを置く場合でも動作します。

使用するライブラリ：AOS.js
GitHub: [michalsnik/aos](https://github.com/michalsnik/aos)

## ファイル構成

- main.js
- index.html (任意に変更してください)
- style.css (任意に変更してください)
- reset.css (任意に変更してください)
- images/fuji.jpg (任意に変更してください)

## 使い方

### HTML の設定

AOS.js のスクリプトと CSS を読み込んだうえで、main.js のスクリプトを読み込んでください。

### JavaScript の設定

1. `main.js`の 7 ~ 63 行目までの`SetAosSettings`と`initSetAosSettings()`のコードを JavaScript ファイルにコピーしてください。
2. `initSetAosSettings()`を実行することで、AOS の初期設定がされます。  
   （※単純に関数を実行するだけでも動作しますし、オブジェクトや変数に格納する形でも OK です）

- `SetAosSettings`: AOS の設定をまとめています。

  - `AOS_OPTIONS`  
    AOS の各種オプション設定を記載するオブジェクトです。  
    詳細は AOS.js 公式ドキュメントを参照してください。

  - `initEventListener`  
    ブラウザのウィンドウをリサイズしたタイミングで`AOS.refresh()`を実行する処理です。  
    AOS.js は仕様上、ページ内のコンテンツの配置（高さ）が変わったときに自動で発火位置の調整が行われないため、リサイズ時にリフレッシュを行っています。

- `initSetAosSettings`  
  AOS.js の実行に必要な`AOS`の存在確認とスタイルシート`aos.css`が読み込まれているかの確認を行ったうえで、設定を実行する形でエラーハンドリングしています。

## ライセンス

このプロジェクトは MIT ライセンスのもとで公開されています。詳細は[LICENSE](LICENSE.txt)ファイルを参照してください。

This project is licensed under the MIT License - see the [LICENSE](LICENSE.txt) file for details.
