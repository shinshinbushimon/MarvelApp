import { atom } from 'recoil';
import { Character } from 'src/type/Character';
import { pageApiData } from 'src/type/app'; 

// pagekeyとapiデータバリューを保持する
export const MarvelApi = atom<pageApiData<Character>>({
    key: 'MarvelApi',
    default: {}
});

// pagekeyを保存するアトム
export const currentPage = atom<number>({
    key: 'currentPage',
    default: 1
});