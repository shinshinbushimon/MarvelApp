import { 
  SeriesSummary, 
  CharacterList, 
  ComicList, 
  CreatorList, 
  EventList, 
  Image, 
  SeriesList, 
  StoryList, 
  Url 
} from "./Common";

// CharacterDataWrapper: APIの呼び出し結果を包含するオブジェクト
export interface CharacterDataWrapper {
  code?: number; // HTTPステータスコード
  status?: string; // 呼び出しステータスの文字列説明
  copyright?: string; // 返された結果の著作権表示
  attributionText?: string; // この結果の帰属表示。この通知またはattributionHTMLの内容をデータを表示するすべての画面に表示してください。
  attributionHTML?: string; // この結果のHTML表現の帰属表示。この通知またはattributionTextの内容をデータを表示するすべての画面に表示してください。
  data?: CharacterDataContainer; // 呼び出しによって返された結果
  etag?: string; // 呼び出しによって返されたコンテンツのダイジェスト値
}

// CharacterDataContainer: キャラクター情報のコンテナ
export interface CharacterDataContainer {
  offset?: number; // 呼び出しの要求されたオフセット（スキップされた結果の数）
  limit?: number; // 要求された結果の制限
  total?: number; // 現在のフィルタセットで利用可能なリソースの総数
  count?: number; // この呼び出しによって返された結果の総数
  results?: Character[]; // 呼び出しによって返されたキャラクターのリスト
}

// Character: キャラクターリソース
export interface Character {
  id?: number; // キャラクターリソースの一意のID
  name?: string; // キャラクターの名前
  description?: string; // キャラクターの短い説明または伝記
  modified?: Date; // リソースが最後に変更された日付
  resourceURI?: string; // このリソースの正規URL識別子
  urls?: Url[]; // リソースの公開WebサイトURLのセット
  thumbnail?: Image; // このキャラクターの代表画像
  comics?: ComicList; // このキャラクターを特集するコミックのリソースリスト
  stories?: StoryList; // このキャラクターが登場するストーリーのリソースリスト
  events?: EventList; // このキャラクターが登場するイベントのリソースリスト
  series?: SeriesList; // このキャラクターが登場するシリーズのリソースリスト
}
  

