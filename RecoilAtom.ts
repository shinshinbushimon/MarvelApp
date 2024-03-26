import { atom } from 'recoil';
import { pageApiData } from 'src/type/app'; 

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

// 検索関連の値を保存する
export const searchStates = atom<{
    characters: string,
    comics: string,
    // その他のエンドポイント用の検索状態
  }>({
    key: "searchStates",
    default: {
      characters: '',
      comics: '',
      // 初期状態
    }
});
  