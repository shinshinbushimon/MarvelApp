import { atom } from 'recoil';
import { pageApiData } from 'src/type/app';
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
