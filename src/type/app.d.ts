import { Character } from "./Character"

export interface postType {
    type: string,
    payload: Character[]
}

// page毎に変化するAPIのデータ
export interface pageApiData {
    [page: number]: Character[]
}
// useReducerの準備
export interface initialState {
    isLoading: boolean,
    isError: string,
    post: Character[]
}
