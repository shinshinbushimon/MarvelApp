import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useCallback, useEffect, useRef, useState } from 'react';
import { 
    MarvelApi,
    currentPage, 
    searchValue, 
    searchOutput,
    targetCharacterId, 
    targetCharacter, 
    loggedInItem, 
    loginStatus, 
    totalDataCountState, 
    movies, 
    movieArrPatern, 
    FavChars, 
    FavMovies, 
    loggedInMovieItem,
    userId
} from './RecoilAtom';
import { Image } from 'src/type/Common';
import { 
    ValidationHook, 
    ServerHasErrorResponse, 
    ServerSessionResponse, 
    InitialDataResponse, 
    ServerErrors, 
    ServerFavoriteResponse
} from 'src/type/app';

import axios from 'axios';
import { FavoriteItemType } from 'src/type/enum';

const waitTime = 500 // 検索記入欄で遅延させる時間
type ServerResponse = (ServerHasErrorResponse | ServerSessionResponse);
const REQUEST_POINT = process.env.REQUEST_URL;

// サーバレスポンスを検証するための型ガード関数
function isErrorResponse(serverRes: ServerResponse): serverRes is ServerHasErrorResponse {
    return (serverRes as ServerHasErrorResponse).message !== undefined;
}

// 初期起動時に行う、ログインされたことがあるかと保存されているユーザ情報の確認
// useNavigateを適切に使うところから
export const useHasEverLogin = () => {
    const setUserFavorite = useSetRecoilState(loggedInItem); // お気に入りデータを保持するatom
    const setUserMovieFavorite = useSetRecoilState(loggedInMovieItem);
    const setLoginStatus = useSetRecoilState(loginStatus);
    const setUserName = useSetRecoilState(userId);

    useEffect(() => {
        
        const checkLoggin = async () => {
            try {
                const response = await axios.get(`${REQUEST_POINT}/first-ope`); // 初期起動時
                const data = response.data;
        
                if (response.status < 200 || response.status >= 300) {
                    if (isErrorResponse(data)) {
                        throw new Error(data.message || 'Network response was not ok');
                    }
                }
        
                const sessionRes: ServerSessionResponse = data;
                const characterIds = sessionRes.accountData?.characterIds || [];
                const movieIds = sessionRes.accountData?.movieIds || [];
                const username = sessionRes.username || 'user';

                setUserFavorite(characterIds);
                setUserMovieFavorite(movieIds);
                setUserName(username);
        
                if (sessionRes.loggedIn) {
                    setLoginStatus(true);
                } else {
                    setLoginStatus(false);
                }
        
            } catch (error) {
                console.error("warning!!", error);
                if (axios.isAxiosError(error) && error.response) {
                    const data = error.response.data;
                    if (isErrorResponse(data)) {
                        console.error("Server Error:", data.message || 'Network response was not ok');
                    }
                }
            }
        };
        
            checkLoggin();
    }, []);
}

export const useInitialNumberOfData = () => {
    const [totalDataCount, setTotalDataCount] = useRecoilState(totalDataCountState); 

    useEffect(() => {
    const fetchTotalDataCount = async () => {
        try {
          const response = await fetch(`${REQUEST_POINT}/marvel-characters/data-count`);
          const data: InitialDataResponse = await response.json();
          setTotalDataCount(data.dataCount);
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
            if(!apiData[pageData]) {
                try {
                    const response = await fetch(`${REQUEST_POINT}/marvel-characters?page=${pageData}`);
                    const data = await response.json();

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
    const searchQuery = useRecoilValue(searchValue); 
    const setSearchResults = useSetRecoilState(searchOutput); 

    useEffect(() => {
        const source = axios.CancelToken.source();

        const fetchData = async () => {
            if (searchQuery) {
                setSearchResults([]);
                const jobId = setTimeout(async () => {
                    try {
                        const response = await axios.get(`${REQUEST_POINT}/marvel-characters-search`, {
                            params: { name: searchQuery },
                            cancelToken: source.token,
                        });
                        const searchedData = response.data;
                        setSearchResults(searchedData);
                    } catch (error) {
                        if (axios.isCancel(error)) {
                            console.error('Request canceled', error.message);
                        } else {
                            console.error('Fetch error: ', error);
                        }
                    }
                }, waitTime);

                return () => {
                    clearTimeout(jobId);
                    source.cancel('Operation canceled by the user.');
                };
            } else {
                setSearchResults([]);
            }
        };

        fetchData();

        // クリーンアップ関数を返す
        return () => {
            source.cancel('Operation canceled by the user.');
        };
    }, [searchQuery, setSearchResults]); 
};


// 未キャッシュの詳細情報を表示するためにDBに取得しに行く
export const useDetailSearch = () => {
    const pageData  = useRecoilValue(currentPage);
    const apiData = useRecoilValue(MarvelApi);
    const watchingId = useRecoilValue(targetCharacterId);
    const setCharacterInfo = useSetRecoilState(targetCharacter);
    const [isLoading, setIsLoading] = useState(true);

    useEffect(() => {
        const getData = async () => {
            setIsLoading(true);
            let cachedData = apiData[pageData]?.find(character => character.id === watchingId);

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

    useEffect(() => {
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
    const setMovieFavorites = useSetRecoilState(loggedInMovieItem);
  
    const verifyData = useCallback(
        async (
            userId: string,
            password: string, 
            targetDomain: string,
            isPermitted: boolean
        ): Promise<boolean> => {
            setIsLoading(true);

            try {
                const response = await fetch(`${REQUEST_POINT}/${targetDomain}`, {
                    method: 'POST',
                    headers: { 'Content-Type': 'application/json' },
                    body: JSON.stringify({ 
                        username: userId, 
                        password: password,
                        sessionPermission: isPermitted
                    }),
                    credentials: 'include',
                });
                const data = await response.json();
                if (!response.ok) {                    
                   setAuthError([data]);
                    
                    return false;
                }

                // アクセスが受け入れられた処理
                const resData = data as ServerSessionResponse;
                setFavorites(resData.accountData?.characterIds || []);
                setMovieFavorites(resData.accountData?.movieIds || []);
                return resData.loggedIn;
            } catch (error) {
                console.error("キャッチされたエラー:", error);
                setAuthError([{ type: 'server', value: '', msg: error.message, path: 'general', location: 'server' }]);
                return false;
            } finally {
                setIsLoading(false);
            }
        }, [setAuthError, setFavorites]);

    return { verifyData, isLoading };
};
export const createURI = (
    dataType: string, 
    characterId: number, 
    offset: number
) => {
    return `${REQUEST_POINT}/marvel-characters/${characterId}/${dataType}?offset=${offset}`
}

// お気に入りのuserId: characterid配列の組み合わせを格納するカスタムフック
export const addToFavorites = async (
    userId: string, 
    targetId: number,
    targetType: FavoriteItemType
) => {
    try {
        if(targetType === FavoriteItemType.Character) {
            const response = await axios.post(
                `${REQUEST_POINT}/addFavorites`,
                {
                    username: userId,
                    characterId: targetId
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
    
        } else if (targetType === FavoriteItemType.Movie) {
            const response = await axios.post(
                `${REQUEST_POINT}/addMovieFavorites`,
                {
                    username: userId,
                    movieId: targetId
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
        }
    } catch (error) {
        console.error(error);
    }

}
// お気に入りのuserId: characterid配列の組み合わせを削除するカスタムフック
export const removeFromFavorites = async (
    userId: string, 
    targetId: number,
    targetType: FavoriteItemType
) => {
    try {
        if(targetType === FavoriteItemType.Character) {
            const response = await axios.post(
                `${REQUEST_POINT}/removeFavorites`,
                {
                    username: userId,
                    characterId: targetId
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
    
            const resData: ServerHasErrorResponse = response.data;
        } else if (targetType === FavoriteItemType.Movie) {
            const response = await axios.post(
                `${REQUEST_POINT}/removeMovieFavorites`,
                {
                    username: userId,
                    movieId: targetId
                },
                {
                    headers: {
                        'Content-Type': 'application/json'
                    },
                    withCredentials: true
                }
            );
    
        }
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

// お気に入り画面を開いたときに実データを取得する
export const useGetFavorites = (characterIds: number[], movieIds: number[]) => {
    const setCharFavsData = useSetRecoilState(FavChars);
    const setMovieFavsData = useSetRecoilState(FavMovies);
    const endpoint = 'get-favorite-data'; // エンドポイント

    const getFavsData = useCallback(async () => {
        try {
            const response = await axios.post(`${REQUEST_POINT}/${endpoint}`, {
                characterIds,
                movieIds
            }, {
                withCredentials: true,  
            });

            const resData = response.data as ServerFavoriteResponse;
            setCharFavsData(resData.characters || []);
            setMovieFavsData(resData.movies || []);
        } catch (err) {
            console.error(err);
        }
    }, [characterIds, movieIds])

    return getFavsData;
}

export const useTranslate = () => {
    const endpoint = 'marvel-translate';

    const translateText = useCallback(async (targetText: string, targetLang: string, signal: AbortSignal) => {
        try {
            const response = await axios.post(`${REQUEST_POINT}/${endpoint}`, {
                targetText,
                targetLang
            }, {
                withCredentials: true,  
                signal: signal 
            });

            const resData = response.data;
            console.log("serverから返された翻訳値はこちらです", resData);
            return resData.translatedText;
        } catch (err) {
            if (axios.isCancel(err)) {
                console.log('翻訳リクエストがキャンセルされました');
            } else {
                console.error(err);
            }
            return targetText; 
        }
    }, []);

    return translateText;
};

// 翻訳APIリクエストを管理するカスタムフックス
export const useTranslationHandler = (description: string) => {
    const translateFunc = useTranslate();
    const [monitoredDescription, setMonitoredDescription] = useState<string>('');
    const [translatedDescription, setTranslatedDescription] = useState<string>('');
    const currentRequestRef = useRef<AbortController | null>(null);
  
    useEffect(() => {
      const translate = async (description: string) => {
        if (description && description.trim() !== '') {
          const controller = new AbortController();
          currentRequestRef.current = controller;
  
          try {
            const translatedText = await translateFunc(description, 'JA', controller.signal);
            if (!controller.signal.aborted) {
              setTranslatedDescription(translatedText);
            }
          } catch (error) {
            if (controller.signal.aborted) {
              console.log('翻訳リクエストがキャンセルされました');
            } else {
              console.error(error);
            }
          } finally {
            currentRequestRef.current = null;
          }
        } else {
          setTranslatedDescription('');
        }
      };
  
      if (description) {
        setMonitoredDescription(description);
        translate(description);
      } else {
        setMonitoredDescription('');
        setTranslatedDescription('');
      }
  
      return () => {
        if (currentRequestRef.current) {
          currentRequestRef.current.abort();
        }
      };
    }, [description, translateFunc]);
  
    return { monitoredDescription, translatedDescription };
  };