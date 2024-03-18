// SeriesDataWrapper.d.ts
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

// SeriesDataWrapper: シリーズデータのラッパー
interface SeriesDataWrapper {
  code?: number; // HTTPステータスコード
  status?: string; // 呼び出しステータスの文字列説明
  copyright?: string; // 返された結果の著作権表示
  attributionText?: string; // この結果の帰属表示。Marvel Comics APIからのデータを含む全ての画面で、この通知またはattributionHTMLの内容を表示してください。
  attributionHTML?: string; // この結果のHTML表現の帰属表示。Marvel Comics APIからのデータを含む全ての画面で、この通知またはattributionTextの内容を表示してください。
  data?: SeriesDataContainer; // 呼び出しによって返された結果
  etag?: string; // 呼び出しによって返されたコンテンツのダイジェスト値
}

// SeriesDataContainer: シリーズデータコンテナ
interface SeriesDataContainer {
  offset?: number; // 呼び出しの要求されたオフセット（スキップされた結果の数）
  limit?: number; // 要求された結果の制限
  total?: number; // 現在のフィルターセットで利用可能なリソースの総数
  count?: number; // この呼び出しによって返された結果の総数
  results?: Series[]; // 呼び出しによって返されたシリーズのリスト
}

// Series: シリーズリソース
interface Series {
  id?: number; // シリーズリソースの一意のID
  title?: string; // シリーズの正式タイトル
  description?: string; // シリーズの説明
  resourceURI?: string; // このリソースの正規URL識別子
  urls?: Url[]; // リソースの公開WebサイトURLのセット
  startYear?: number; // シリーズの最初の出版年
  endYear?: number; // シリーズの最後の出版年（継続中のシリーズの場合は通常2099）
  rating?: string; // シリーズの年齢適切性評価
  modified?: Date; // リソースが最後に変更された日付
  thumbnail?: Image; // このシリーズの代表画像
  comics?: ComicList; // このシリーズに含まれるコミックのリソースリスト
  stories?: StoryList; // このシリーズで発生するストーリーのリソースリスト
  events?: EventList; // このシリーズで発生するイベントのリソースリスト
  characters?: CharacterList; // このシリーズに登場するキャラクターのリソースリスト
  creators?: CreatorList; // このシリーズのコミックに作品が含まれるクリエイターのリソースリスト
  next?: SeriesSummary; // このシリーズに続くシリーズの要約表現
  previous?: SeriesSummary; // このシリーズに先行するシリーズの要約表現
}
