// ComicDataWrapper: コミックデータのラッパー
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
import { MarvelElement } from "./Common";
export interface ComicDataWrapper {
  code?: number; // HTTPステータスコード
  status?: string; // 呼び出しステータスの文字列説明
  copyright?: string; // 返された結果の著作権表示
  attributionText?: string; // この結果の帰属表示。Marvel Comics APIからのデータを含む全ての画面で、この通知またはattributionHTMLの内容を表示してください。
  attributionHTML?: string; // この結果のHTML表現の帰属表示。Marvel Comics APIからのデータを含む全ての画面で、この通知またはattributionTextの内容を表示してください。
  data?: ComicDataContainer; // 呼び出しによって返された結果
  etag?: string; // 呼び出しによって返されたコンテンツのダイジェスト値
}

// ComicDataContainer: コミックデータコンテナ
export interface ComicDataContainer {
  offset?: number; // 呼び出しの要求されたオフセット（スキップされた結果の数）
  limit?: number; // 要求された結果の制限
  total?: number; // 現在のフィルターセットで利用可能なリソースの総数
  count?: number; // この呼び出しによって返された結果の総数
  results?: Comic[]; // 呼び出しによって返されたコミックのリスト
}

// Comic: コミックリソース
export interface Comic extends MarvelElement {
  id?: number; // コミックリソースの一意のID
  digitalId?: number; // このコミックのデジタル表現のID。デジタル版が利用不可の場合は0になります。
  title?: string; // コミックの正式タイトル
  issueNumber?: number; // シリーズ内の発行番号（コレクションフォーマットの場合は一般的に0）
  variantDescription?: string; // 発行がバリアント（例: 代替カバー、第二版、ディレクターズカットなど）の場合のテキスト説明
  description?: string; // コミックの説明
  modified?: Date; // リソースが最後に変更された日付
  isbn?: string; // コミックのISBN（一般的にはコレクションフォーマットでのみ入力されます）
  upc?: string; // コミックのUPCバーコード番号（一般的には定期刊行フォーマットでのみ入力されます）
  diamondCode?: string; // コミックのダイヤモンドコード
  ean?: string; // コミックのEANバーコード
  issn?: string; // コミックのISSNバーコード
  format?: string; // コミックの出版フォーマット（例: コミック、ハードカバー、トレードペーパーバック）
  pageCount?: number; // コミック内のストーリーページ数
  textObjects?: TextObject[]; // コミックの説明テキストブラーブのセット
  resourceURI?: string; // このリソースの正規URL識別子
  urls?: Url[]; // リソースの公開WebサイトURLのセット
  series?: SeriesSummary; // このコミックが属するシリーズの要約表現
  variants?: ComicSummary[]; // このコミックのバリアントのリスト（現在の発行がバリアントの場合、「元の」発行を含む）
  collections?: ComicSummary[]; // このコミックを含むコレクションのリスト（コミックのフォーマットがコレクションの場合、一般的に空になります）
  collectedIssues?: ComicSummary[]; // このコミックに収集された発行物のリスト（「コミック」や「マガジン」などの定期刊行フォーマットの場合、一般的に空になります）
  dates?: ComicDate[]; // このコミックの重要な日付のリスト
  prices?: ComicPrice[]; // このコミックの価格リスト
  thumbnail?: Image; // このコミックの代表画像
  images?: Image[]; // このコミックに関連するプロモーション画像のリスト
  creators?: CreatorList; // このコミックに関連するクリエイターのリソースリスト
  characters?: CharacterList; // このコミックに登場するキャラクターのリソースリスト
  stories?: StoryList; // このコミックに登場するストーリーのリソースリスト
  events?: EventList; // このコミックが登場するイベントのリソースリスト
}

// TextObject: テキストオブジェクト
export interface TextObject {
  type?: string; // テキストオブジェクトの正式タイプ（例: 勧誘テキスト、プレビューテキストなど）
  language?: string; // テキストオブジェクトが記述されている言語のIETF言語タグ
  text?: string; // テキスト
}

// ComicDate: コミックの日付
export interface ComicDate {
  type?: string; // 日付の説明（例: 発売日、FOC日）
  date?: Date; // 日付
}

// ComicPrice: コミックの価格
export interface ComicPrice {
  type?: string; // 価格の説明（例: 印刷価格、デジタル価格）
  price?: number; // 価格（全てUSDで表記）
}

