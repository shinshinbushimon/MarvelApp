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