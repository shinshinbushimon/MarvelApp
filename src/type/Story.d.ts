// StoryDataWrapper.d.ts
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

// StoryDataWrapper: ストーリーデータのラッパー
export interface StoryDataWrapper {
  code?: number; // HTTPステータスコード
  status?: string; // 呼び出しステータスの文字列説明
  copyright?: string; // 返された結果の著作権表示
  attributionText?: string; // この結果の帰属表示。Marvel Comics APIからのデータを含む全ての画面で、この通知またはattributionHTMLの内容を表示してください。
  attributionHTML?: string; // この結果のHTML表現の帰属表示。Marvel Comics APIからのデータを含む全ての画面で、この通知またはattributionTextの内容を表示してください。
  data?: StoryDataContainer; // 呼び出しによって返された結果
  etag?: string; // 呼び出しによって返されたコンテンツのダイジェスト値
}

// StoryDataContainer: ストーリーデータコンテナ
export interface StoryDataContainer {
  offset?: number; // 呼び出しの要求されたオフセット（スキップされた結果の数）
  limit?: number; // 要求された結果の制限
  total?: number; // 現在のフィルターセットで利用可能なリソースの総数
  count?: number; // この呼び出しによって返された結果の総数
  results?: Story[]; // 呼び出しによって返されたストーリーのリスト
}

// Story: ストーリーリソース
export interface Story {
  id?: number; // ストーリーリソースの一意のID
  title?: string; // ストーリーのタイトル
  description?: string; // ストーリーの短い説明
  resourceURI?: string; // このリソースの正規URL識別子
  type?: string; // ストーリーのタイプ（例: 内部ストーリー、カバー、テキストストーリー）
  modified?: Date; // リソースが最後に変更された日付
  thumbnail?: Image; // このストーリーの代表画像
  comics?: ComicList; // このストーリーが含まれるコミックのリソースリスト
  series?: SeriesList; // このストーリーが含まれるシリーズのリソースリスト
  events?: EventList; // このストーリーが含まれるイベントのリソースリスト
  characters?: CharacterList; // このストーリーに登場するキャラクターのリソースリスト
  creators?: CreatorList; // このストーリーに関わるクリエイターのリソースリスト
  originalissue?: ComicSummary; // このストーリーが最初に公開されたイシューの要約表現
}
