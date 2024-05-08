import { atom } from 'recoil';
import { pageApiData, MovieData } from 'src/type/app';
import { Character } from 'src/type/Character';
import { Comic } from 'src/type/Comic';
import { Creator } from 'src/type/Creators';
import { Events } from 'src/type/Event';
import { Series } from 'src/type/Series';
import { Story } from 'src/type/Story';

// pagekeyとapiデータバリューを保持する
export const MarvelApi = atom<pageApiData>({
    key: 'MarvelApi',
    default: {}
});

// pagekeyを保存するアトム
export const currentPage = atom<number>({
    key: 'currentPage',
    default: 1
});

// 検索窓に紐づける値
export const searchValue = atom<string>({
  key: "searchValue",
  default: ""
});

// 検索に対応するための検索結果格納配列
export const searchOutput = atom<Character[]>({
  key: "searchOutput",
  default: []
});

// 詳細画面等単体のデータが対象となるとき
export const targetCharacterId = atom<number>({
  key: "targetCharacterId",
  default: 0
});

// 以下実データ
export const targetCharacter = atom<Character>({
  key: "targetCharacter",
  default: undefined
});



// データの取得と管理
export const AllScrollData = atom<{
  'comics': Comic[],
  'events': Events[],
  'creators': Creator[],
  'series': Series[],
  'stories': Story[]
}>({
  key: 'AllScrollData',
  default: {
  'comics': [],
  'events': [],
  'creators':[],
  'series': [],
  'stories': []
  }
});

// 後ほど使うuserId情報
export const userId = atom<string>({
  key: "userId",
  default: ''
});

// お気に入りたち
export const favoriteCharacterInfos = atom<number[]>({
  key: 'favoriteCharacterInfos',
  default: []
});

export const hasAcceptedUser = atom<boolean>({
  key: "HasAcceptedUser",
  default: false
});

// loginしたことがあるかどうか
export const loginStatus = atom<boolean>({
  key: 'loginStatus',
  default: undefined
});

// お気に入りページで使用するデータ
export const loggedInItem = atom<string[]>({
  key: 'loggedInItem',
  default: []
});

// MongoDBデータ件数
export const totalDataCountState = atom<number>({
  key: "totalDataCount",
  default: undefined
});

// movieデータ
export const movies = atom<MovieData[]>({
  key: "movies",
  default: []
});

// 選択されているナビゲーション
export const selectedNav = atom<string>({
  key: "selectedNav",
  default: 'movies'
});

// 映画情報の並び順
export const movieArrPatern = atom<string>({
  key: "movieArrPatern",
  default: ""
});