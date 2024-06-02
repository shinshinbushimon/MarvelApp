## アプリケーションURL
[https://shinshinbushimon.cinemaverseproductions.com](https://shinshinbushimon.cinemaverseproductions.com)  
サインイン時のユーザー名、パスワードともに半角英数字5文字以上でご入力ください。

## プロジェクトの概要と目的
Marvel作品が人気なものの、シリーズがたくさんあり時系列やキャラクターに対する理解が追い付いていない人が多いと考え、映画と原作のキャラクターを紐づけることができるアプリケーションがあるとMarvelヒーローコミックの人気、良さが多くの人に楽しんでもらえるきっかけになると感じたため実装しました。対象作品情報はTMDbAPIから、MCU（マーベルシネマティックユニバース）映画の2008年(設立年)〜現在にわたる映画作品が対象となっています。キャラクターはMarvelAPIから取得できるキャラクターすべてを対象としています。

## 使用技術

### フロントエンド
- React
- TypeScript
- Atomic Design
- Recoil
- Webpack

### サーバサイド
- Express
- TypeScript
- OOP
- Nginx
- MVCアーキテクチャ

### データベース
- MySQL
- MongoDB

### コンテナとデプロイメント
- Docker
- AWS

## 使用API
- MarvelAPI: [https://developer.marvel.com](https://developer.marvel.com)
- TMDbAPI: [https://developers.themoviedb.org](https://developers.themoviedb.org)
- DeepLAPI: [https://www.deepl.com/docs-api](https://www.deepl.com/docs-api)

## 機能
- **ログインとパスワード設定:** ログイン、パスワードはそれぞれ5文字以上の英数字で設定してください。
- **お気に入り機能:** 映画、キャラクターランク一覧それぞれにお気に入りマークが存在し、アカウントに紐づけてお気に入りを次回からのログイン時に取得、反映させることができます。
- **翻訳機能:** 原作の英語による説明をDeepLAPIを介して日本語に翻訳できるようにしています。
- **セッション機能:** ログインまたはサインイン時にセッションとして記録するかどうか選択することができます。
- **絞り込み検索:** 文字入力後数秒待機して。入力値に部分一致するアイテムを取得するようにしています。

## ファイル構成とリソースの説明
- **フロントエンド:**
  - `src/atoms`
  - `src/molecules`
  - `src/organisms`
  - `src/pages`
  - `src/RoutesLogic`
  - `src/templates`
  - `src/type`
- **サーバサイド:**
  - `backend/src/Controller`
  - `backend/src/Repository`
  - `backend/src/Router`
  - `backend/src/util`
  - `backend/src/Validation`

## システムアーキテクチャ
- **OOP, MVC**
  - バックエンドではOOPを使ってModel, Controllerを表現しました。
- **Atomic Design**
  - 各コンポーネントに階層構造を用いて、コンポーネントの再利用を実施しました。

## 環境設定とデプロイ
- **環境変数**
  - `.env`ファイルにAPIキーやデータベースの接続情報を設定します。
- **Docker**
  - `docker-compose.yml`で本番疑似環境を作成したうえで必要なサービスを定義し、ローカル環境での開発を容易にします。
- **AWS**
  - EC2インスタンス、RDSをセットアップしデプロイメントを実施しました。
 
