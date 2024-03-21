export interface postType {
    type: string,
    payload: Character[]
}

// useReducerの準備
export interface initialState {
    isLoading: true,
    isError: '',
    post: Character[]
}
