// Url: URL情報
export interface Url {
  type?: string; // URLのテキスト識別子
  url?: string; // 完全なURL（スキーム、ドメイン、パスを含む）
}
  
// Image: 画像情報
export interface Image {
  path?: string; // 画像へのディレクトリパス
  extension?: string; // 画像のファイル拡張子
}
  
// ComicList: コミックリスト
export interface ComicList {
  available?: number; // このリストに利用可能な総発行物数
  returned?: number; // このコレクションで返された発行物の数（最大20）
  collectionURI?: string; // このコレクション内の発行物の完全なリストへのパス
  items?: ComicSummary[]; // このコレクションで返された発行物のリスト
}
  
// ComicSummary: コミック概要
export interface ComicSummary {
  resourceURI?: string; // 個々のコミックリソースへのパス
  name?: string; // コミックの正式名称
}


// StoryList: ストーリーリスト
export interface StoryList {
  available?: number; // このリストに利用可能な総ストーリー数
  returned?: number; // このコレクションで返されたストーリーの数（最大20）
  collectionURI?: string; // このコレクション内のストーリーの完全なリストへのパス
  items?: StorySummary[]; // このコレクションで返されたストーリーのリスト
}

// StorySummary: ストーリー概要
export interface StorySummary {
  resourceURI?: string; // 個々のストーリーリソースへのパス
  name?: string; // ストーリーの正式名称
  type?: string; // ストーリーのタイプ（内部または表紙）
}

// EventList: イベントリスト
export interface EventList {
  available?: number; // このリストに利用可能な総イベント数
  returned?: number; // このコレクションで返されたイベントの数（最大20）
  collectionURI?: string; // このコレクション内のイベントの完全なリストへのパス
  items?: EventSummary[]; // このコレクションで返されたイベントのリスト
}

// EventSummary: イベント概要
export interface EventSummary {
  resourceURI?: string; // 個々のイベントリソースへのパス
  name?: string; // イベントの名称
}

// SeriesList: シリーズリスト
export interface SeriesList {
  available?: number; // このリストに利用可能な総シリーズ数
  returned?: number; // このコレクションで返されたシリーズの数（最大20）
  collectionURI?: string; // このコレクション内のシリーズの完全なリストへのパス
  items?: SeriesSummary[]; // このコレクションで返されたシリーズのリスト
}

// SeriesSummary: シリーズ概要
export interface SeriesSummary {
  resourceURI?: string; // 個々のシリーズリソースへのパス
  name?: string; // シリーズの正式名称
}

// CreatorList: クリエイターリスト
export interface CreatorList {
  available?: number; // 利用可能なクリエイターの総数
  returned?: number; // このコレクションで返されたクリエイターの数（最大20）
  collectionURI?: string; // このコレクション内のクリエイターの完全なリストへのパス
  items?: CreatorSummary[]; // このコレクションで返されたクリエイターのリスト
}

// CreatorSummary: クリエイター概要
export interface CreatorSummary {
  resourceURI?: string; // 個々のクリエイターリソースへのパス
  name?: string; // クリエイターのフルネーム
  role?: string; // 親エンティティにおけるクリエイターの役割
}

// CharacterList: キャラクターリスト
export interface CharacterList {
  available?: number; // 利用可能なキャラクターの総数
  returned?: number; // このコレクションで返されたキャラクターの数（最大20）
  collectionURI?: string; // このコレクション内のキャラクターの完全なリストへのパス
  items?: CharacterSummary[]; // このコレクションで返されたキャラクターのリスト
}

// CharacterSummary: キャラクター概要
export interface CharacterSummary {
  resourceURI?: string; // 個々のキャラクターリソースへのパス
  name?: string; // キャラクターのフルネーム
  role?: string; // 親エンティティにおけるキャラクターの役割
}

// ComicSummary: コミック概要
export interface ComicSummary {
  resourceURI?: string; // 個々のコミックリソースへのパス
  name?: string; // コミックの正式名称
}

// SeriesSummary: シリーズ概要
export interface SeriesSummary {
  resourceURI?: string; // 個々のシリーズリソースへのパス
  name?: string; // シリーズの正式名称
}
