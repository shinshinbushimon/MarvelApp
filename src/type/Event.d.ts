import { 
  ComicList, 
  ComicSummary, 
  CreatorList, 
  CharacterList, 
  EventList, 
  Image, 
  SeriesList, 
  StoryList 
} from "./Common";

// EventDataWrapper: イベントデータのラッパー
interface EventDataWrapper {
  code?: number; // HTTPステータスコード
  status?: string; // 呼び出しステータスの文字列説明
  copyright?: string; // 返された結果の著作権表示
  attributionText?: string; // この結果の帰属表示。Marvel Comics APIからのデータを含む全ての画面で、この通知またはattributionHTMLの内容を表示してください。
  attributionHTML?: string; // この結果のHTML表現の帰属表示。Marvel Comics APIからのデータを含む全ての画面で、この通知またはattributionTextの内容を表示してください。
  data?: EventDataContainer; // 呼び出しによって返された結果
  etag?: string; // 呼び出しによって返されたコンテンツのダイジェスト値
}

// EventDataContainer: イベントデータコンテナ
interface EventDataContainer {
  offset?: number; // 呼び出しの要求されたオフセット（スキップされた結果の数）
  limit?: number; // 要求された結果の制限
  total?: number; // 現在のフィルターセットで利用可能なリソースの総数
  count?: number; // この呼び出しによって返された結果の総数
  results?: Event[]; // 呼び出しによって返されたイベントのリスト
}

// Event: イベントリソース
interface Event {
  id?: number; // イベントリソースの一意のID
  title?: string; // イベントのタイトル
  description?: string; // イベントの説明
  resourceURI?: string; // このリソースの正規URL識別子
  urls?: Url[]; // イベントの公開WebサイトURLのセット
  modified?: Date; // リソースが最後に変更された日付
  start?: Date; // このイベントの最初の発行物の公開日
  end?: Date; // このイベントの最後の発行物の公開日
  thumbnail?: Image; // このイベントの代表画像
  comics?: ComicList; // このイベントに含まれるコミックのリソースリスト
  stories?: StoryList; // このイベントに含まれるストーリーのリソースリスト
  series?: SeriesList; // このイベントに含まれるシリーズのリソースリスト
  characters?: CharacterList; // このイベントに登場するキャラクターのリソースリスト
  creators?: CreatorList; // このイベントに作品が含まれるクリエイターのリソースリスト
  next?: EventSummary; // このイベントに続くイベントの要約表現
  previous?: EventSummary; // このイベントに先行するイベントの要約表現
}

// EventSummary: イベント概要
interface EventSummary {
  resourceURI?: string; // 個々のイベントリソースへのパス
  name?: string; // イベントの名称
}
