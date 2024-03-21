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

// CreatorDataWrapper: クリエイターデータのラッパー
export interface CreatorDataWrapper {
  code?: number; // HTTPステータスコード
  status?: string; // 呼び出しステータスの文字列説明
  copyright?: string; // 返された結果の著作権表示
  attributionText?: string; // この結果の帰属表示。Marvel Comics APIからのデータを含む全ての画面で、この通知またはattributionHTMLの内容を表示してください。
  attributionHTML?: string; // この結果のHTML表現の帰属表示。Marvel Comics APIからのデータを含む全ての画面で、この通知またはattributionTextの内容を表示してください。
  data?: CreatorDataContainer; // 呼び出しによって返された結果
  etag?: string; // 呼び出しによって返されたコンテンツのダイジェスト値
}

// CreatorDataContainer: クリエイターデータコンテナ
export interface CreatorDataContainer {
  offset?: number; // 呼び出しの要求されたオフセット（スキップされた結果の数）
  limit?: number; // 要求された結果の制限
  total?: number; // 現在のフィルターセットで利用可能なリソースの総数
  count?: number; // この呼び出しによって返された結果の総数
  results?: Creator[]; // 呼び出しによって返されたクリエイターのリスト
}

// Creator: クリエイターリソース
export interface Creator {
  id?: number; // クリエイターリソースの一意のID
  firstName?: string; // クリエイターの名
  middleName?: string; // クリエイターのミドルネーム
  lastName?: string; // クリエイターの姓
  suffix?: string; // クリエイターの接尾辞または敬称
  fullName?: string; // クリエイターのフルネーム（上記のフィールドをスペースで区切ったもの）
  modified?: Date; // リソースが最後に変更された日付
  resourceURI?: string; // このリソースの正規URL識別子
  urls?: Url[]; // リソースの公開WebサイトURLのセット
  thumbnail?: Image; // このクリエイターの代表画像
  series?: SeriesList; // このクリエイターによる作品を含むシリーズのリソースリスト
  stories?: StoryList; // このクリエイターによる作品を含むストーリーのリソースリスト
  comics?: ComicList; // このクリエイターによる作品を含むコミックのリソースリスト
  events?: EventList; // このクリエイターによる作品を含むイベントのリソースリスト
}

