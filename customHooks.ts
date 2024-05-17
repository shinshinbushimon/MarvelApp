import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MarvelApi, currentPage, searchValue, searchOutput, targetCharacterId, targetCharacter, AllScrollData, userId, hasAcceptedUser, loggedInItem, loginStatus, totalDataCountState, movies, movieArrPatern } from './RecoilAtom';
import { Character } from 'src/type/Character';
import { Image, MarvelElement } from 'src/type/Common';
import { ComicDataContainer } from 'src/type/Comic';
import { ValidationHook, ServerHasErrorResponse, ServerSessionResponse, InitialDataResponse, ServerErrors } from 'src/type/app';
import { useNavigate } from 'react-router-dom';
import { get } from 'http';
import axios from 'axios';

if(process.env.NODE_ENV === 'development') {
    console.log('これは開発環境用のビルドです。')
} else if (process.env.NODE_ENV === 'production') {
    console.log('これは本番環境用のビルドです。')
} else {
    console.log('これはどちらでもありません');
}

const waitTime = 500 // 検索記入欄で遅延させる時間
type ServerResponse = (ServerHasErrorResponse | ServerSessionResponse);
const REQUEST_POINT = process.env.REQUEST_URL;

// サーバレスポンスを検証するための型ガード関数
function isErrorResponse(serverRes: ServerResponse): serverRes is ServerHasErrorResponse {
    return (serverRes as ServerHasErrorResponse).message !== undefined;
}

console.log("Request URI: ", process.env.REQUEST_URL);

// 初期起動時に行う、ログインされたことがあるかと保存されているユーザ情報の確認
// useNavigateを適切に使うところから
export const useHasEverLogin = () => {
    const setUserFavorite = useSetRecoilState(loggedInItem); // お気に入りデータを保持するatom
    const setLoginStatus = useSetRecoilState(loginStatus);

    useEffect(() => {
        
        const checkLoggin = async () => {
            try {
                const response = await fetch(`${REQUEST_POINT}/first-ope`); // 初期起動時
                const data: ServerResponse = await response.json(); // 一度だけ呼び出し

                if (!response.ok) {
                // ここで data を ServerHasErrorResponse として扱う
                    if(isErrorResponse(data)) {
                        throw new Error(data.message || 'Network response was not ok');
                    }
                } 
                const sessionRes = data as ServerSessionResponse;
                console.log("this users favorites are ", sessionRes.accountData);
                setUserFavorite(sessionRes.accountData);

                if(sessionRes.loggedIn) {
                    console.log('I know this user!!!');
                    setLoginStatus(true);
                    
                } else {
                    console.log("I don't know this user!!!");
                    setLoginStatus(false);
                }

            // 成功した場合の処理。ここで data を ServerSessionResponse として扱う
            } catch (error) {
                // エラーハンドリング
                console.error("warning!!", error);
            }
        };
            checkLoggin();
    }, []);
}

export const useInitialNumberOfData = () => {
    const [totalDataCount, setTotalDataCount] = useRecoilState(totalDataCountState); // 総データ件数

    useEffect(() => {
        // この関数はアプリケーションの初期起動時に一度だけ実行される
    const fetchTotalDataCount = async () => {
        try {
          const response = await fetch(`${REQUEST_POINT}/marvel-characters/data-count`); // MongoDBから総データ件数を取得するエンドポイント
          const data: InitialDataResponse = await response.json();
          setTotalDataCount(data.dataCount); // 取得した総データ件数を設定
        } catch (error) {
          console.error('データ件数の取得に失敗しました', error);
        }
      };

      if (totalDataCount === undefined) {
        fetchTotalDataCount();
      }
    }, []);
} 

// DBアクセス結果のリクエストをサーバへ送信するカスタムフックス
export const useFetchData = () => {
    const pageData = useRecoilValue(currentPage);
    const [apiData, setApiData] = useRecoilState(MarvelApi);


    useEffect(() => {
        const fetchData = async () => {
            // pageDataに値が無ければとってくる
            if(!apiData[pageData]) {
                try {
                    const response = await fetch(`${REQUEST_POINT}/marvel-characters?page=${pageData}`);
                    const data = await response.json();

                    // dataのset, ちなみにオブジェクトがアロー関数内で複数行にわたる場合()でくくらなければならない
                    setApiData((prev) => ({
                        ...prev,
                        [pageData]: data
                    }));
                } catch (err) {
                    console.error("ERR", err)
                }
            }
        }
        fetchData();
    }, [apiData, setApiData, pageData]);
}

// 映画情報を取得するカスタムフック
export const useFetchMoviesData = () => {
    const setMovies = useSetRecoilState(movies);
    const url = `${REQUEST_POINT}/marvel-movies`

    useEffect(() => {
        const getMovieData = async () => {
            try {
                const response = await axios.get(url);
                const data = response.data;
                setMovies(data);
            } catch (err) {
                console.error('Error fetching data:', err);
            }
            
        }
        getMovieData();
    }, [])

}

// 検索結果表示のためにリクエストを依頼するカスタムフック
export const useSearchOutput = () => {
    const searchQuery = useRecoilValue(searchValue); // inputに紐づける検索値
    const setSearchResults = useSetRecoilState(searchOutput); // 検索結果を保持する配列

    useEffect(() => {
        const fetchData = async () => {
            if (searchQuery) {
                setSearchResults([]);
                const jobId = setTimeout(async () => {
                    const response = await fetch(`${REQUEST_POINT}/marvel-characters-search?name=${searchQuery}`);
                    const searchedData = await response.json();
                    console.log("取得した検索文字列たちは", searchedData);
                    setSearchResults(searchedData);
                }, waitTime);

                return () => clearTimeout(jobId);
            } else {
                setSearchResults([]);
            }
        };

        fetchData();
    }, [searchQuery]); // searchQueryの変更を検知して実施する。
}


// 未キャッシュの詳細情報を表示するためにDBに取得しに行く
export const useDetailSearch = () => {
    const pageData  = useRecoilValue(currentPage);
    const apiData = useRecoilValue(MarvelApi);
    const watchingId = useRecoilValue(targetCharacterId);
    const setCharacterInfo = useSetRecoilState(targetCharacter);
    const [isLoading, setIsLoading] = useState(true);
    console.log("current waching Id is ", watchingId);

    useEffect(() => {
        console.log("Effectが実行されました");
        const getData = async () => {
            setIsLoading(true);
            console.log("this place is useDetailSearch ,and the needed data is ", apiData);
            let cachedData = apiData[pageData]?.find(character => character.id === watchingId);
            console.log("cachedData is ", cachedData);

            if (cachedData) {
                setCharacterInfo(cachedData);
                setIsLoading(false);
            } else {
                try {
                    
                    const response = await fetch(`${REQUEST_POINT}/marvel-character-detail?characterId=${watchingId}`);
                    const data = await response.json();
                    setCharacterInfo(data);
                } catch (error) {
                    console.error("Error fetching character detail:", error);
                } finally {
                    setIsLoading(false);
                }
            }
        };

        getData();
    }, [watchingId]);

    return isLoading;
};

// validationチェックと再レンダリングトリガーのカスタムフックス
export const useInputValidation = (initialValue: string): ValidationHook => {
    const waitTime = 2000;
    const regax = /^[a-zA-Z0-9]+$/;
    const [value, setValue] = useState<string>(initialValue);
    const [error, setError] = useState<string>('');
    const [isTyping, setIsTyping] = useState<boolean>(false);
    console.log("called out this customhooks");

    useEffect(() => {
        console.log("called out this validation");
        if (!isTyping) return; 
        const timer = setTimeout(() => {
            if (value === '') {
                setError('入力がありません');
            } else if (!regax.test(value)) {
                setError('英数字のみ入力が可能です');
            } else if (value.length < 5) {
                setError('5文字以上で入力');
            } else {
                setError('');
            }
        }, waitTime);

        return () => clearTimeout(timer);
    }, [value]);

    const handleChange = (e: React.ChangeEvent<HTMLInputElement>): void => {
        setValue(e.target.value);
        setIsTyping(true);
    }

    const validataOutput = {value, error, handleChange};
    return validataOutput;
}

// した二つのデータベース利用処理ではアプリケーションサーバ側でもバリデーションを実施させること
// 新規登録時に重複していないかを確かめる。
export const useVerifyEnteredData = (setAuthError: (error: ServerErrors[]) => void) => {
    const [isLoading, setIsLoading] = useState(false);
    const setFavorites = useSetRecoilState(loggedInItem);
  
    const verifyData = useCallback(
        async (
            userId: string, 
            password: string, 
            targetDomain: string, 
            acceptUser: (output: boolean) => void
        ): Promise<boolean> => {
            setIsLoading(true);
            console.log("userId is: ", userId);
            console.log("password is: ", password);
            console.log("更新は反映されています。");

            try {
                const response = await fetch(`${REQUEST_POINT}/${targetDomain}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ username: userId, password: password}),
                    credentials: 'include',
                });
                const data = await response.json();
                if (!response.ok) {
                    console.error("このレスポンスエラーは ", response);
                    console.error("このエラーデータは ", data);
                    console.error(`Error: ${response.status} - ${data.errors || data.message || 'An error occurred'}`);
                    
                    // データの errors プロパティをエラーハンドリングに使用
                    if (data.errors) {
                        setAuthError(data.errors);
                    } else {
                        setAuthError([{ type: 'server', value: '', msg: data.message || 'An error occurred', path: 'general', location: 'server' }]);
                    }
                    
                    return false;
                }
                
                acceptUser(data.loggedIn);
                setFavorites(data.accountData);
                console.log("ログイン自体は成功しましたか", data.loggedIn);
                console.log("お気に入りは受け取りましたか", data.accountData);

                return data.loggedIn;
            } catch (error) {
                console.error("キャッチされたエラー:", error);
                setAuthError([{ type: 'server', value: '', msg: error.message, path: 'general', location: 'server' }]);
                return false;
            } finally {
                setIsLoading(false);
            }
        }, [setAuthError, setFavorites]);

    return { verifyData, isLoading };
};// serverpointを作成
export const createURI = (
    dataType: string, 
    characterId: number, 
    offset: number
) => {
    return `${REQUEST_POINT}/marvel-characters/${characterId}/${dataType}?offset=${offset}`
}

// お気に入りのuserId: characterid配列の組み合わせを格納するカスタムフック
export const addToFavorites = async (userId: string, characterId: number) => {
    try {
        const response = await fetch(`${REQUEST_POINT}/addFavorites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: userId, characterId: characterId }),
            credentials: 'include',
        });

        const resData: ServerHasErrorResponse = await response.json();
        console.log(resData.message);
    } catch (error) {
        console.error(error);
    }

}
// お気に入りのuserId: characterid配列の組み合わせを削除するカスタムフック
export const removeFromFavorites = async (userId: string, characterId: number) => {
    try {
        const response = await fetch(`${REQUEST_POINT}/removeFavorites`, {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ username: userId, characterId: characterId }),
            credentials: 'include',
        });

        const resData: ServerHasErrorResponse = await response.json();
        console.log(resData.message);
    } catch (error) {
        console.error(error);
    }

}


export const createImg = (img: Image) => {
    if (!img || !img.path || !img.extension) {
        return ''; // またはデフォルトの画像URLを返す
    }
    return img.path + '.' + img.extension
}

export const getMoviePoster = (posterPath: string) => {
    return `https://image.tmdb.org/t/p/original${posterPath}`;
}

export const hiraToKata = (str: string) => {
    return str.replace(/[\u3041-\u3096]/g, ch =>
        String.fromCharCode(ch.charCodeAt(0) + 0x60)
    );
}

export const useChangeArrayment = () => {
    const [AllMovie, SetAllMovie] = useRecoilState(movies);
    const setMovieArrPattern = useSetRecoilState(movieArrPatern);

    const changeArrayment = (pattern: string) => {
        console.log("called changeArrayment");
        
        const copyAllMovie = [...AllMovie];
    
        switch (pattern) {
            case 'accending':
                copyAllMovie.sort((m, n) => m.title.localeCompare(n.title));
                break;
            case 'descending':
                copyAllMovie.sort((m, n) => n.title.localeCompare(m.title));
                break;
            case 'public order':
                    copyAllMovie.sort((m, n) => {
                        const dataM = new Date(m.release_date);
                        const dataN = new Date(n.release_date);
                        return dataN.getTime() - dataM.getTime();
                    })
                    break;
            case 'public disorder':
                    copyAllMovie.sort((m, n) => {
                        const dataM = new Date(m.release_date);
                        const dataN = new Date(n.release_date);
                        return dataM.getTime() - dataN.getTime();
                    })
                    break;
            case 'popularity':
                copyAllMovie.sort((m, n) => n.popularity - m.popularity);
                break;
        }
        
        setMovieArrPattern(pattern);
        SetAllMovie(copyAllMovie);
    }

    return changeArrayment;
}

