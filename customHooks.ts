import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { useCallback, useEffect, useRef, useState } from 'react';
import { MarvelApi, currentPage, searchValue, searchOutput, targetCharacterId, targetCharacter, AllScrollData, userId, hasAcceptedUser, loggedInItem, loginStatus, totalDataCountState } from './RecoilAtom';
import { Character } from 'src/type/Character';
import { Image, MarvelElement } from 'src/type/Common';
import { ComicDataContainer } from 'src/type/Comic';
import { ValidationHook, ServerHasErrorResponse, ServerSessionResponse, InitialDataResponse } from 'src/type/app';
import { useNavigate } from 'react-router-dom';

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
                setUserFavorite(sessionRes.accountData);

                if(sessionRes.loggedIn) {
                    console.log('Iknow this user!!!');
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

// 検索結果表示のためにリクエストを依頼するカスタムフック
export const useSearchOutput = () => {
    const searchQuery = useRecoilValue(searchValue); // inputに紐づける検索値
    const [_, setSearchResults] = useRecoilState(searchOutput); // 検索結果を保持する配列

    useEffect(() => {
        const fetchData = async () => {
            if (searchQuery) {
                const jobId = setTimeout(async () => {
                    const response = await fetch(`${REQUEST_POINT}/marvel-characters-search?name=${searchQuery}`);
                    setSearchResults(await response.json());
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
                setError('This field cannot be empty.');
            } else if (!regax.test(value)) {
                setError('Invalid characters used. Only alphanumeric characters are allowed.');
            } else if (value.length < 5) {
                setError('The input must be at least 5 characters long.');
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
export const useVerifyEnteredData = (setAuthError: (error: string) => void) => {
    const [isLoading, setIsLoading] = useState(false);
  
    const verifyData = useCallback(
        async (
            userId: string, 
            password: string, 
            targetDomain: string, 
            acceptUser: (output: boolean) => void
            ) => {
      setIsLoading(true);
      console.log("userId is: ", userId);
      console.log("password is: ", password);

      try {
        const response = await fetch(`${REQUEST_POINT}/${targetDomain}`, {
          method: 'POST',
          headers: { 'Content-Type': 'application/json' },
          body: JSON.stringify({ userId: userId, password: password}),
          credentials: 'include',
        });
        const data = await response.json();
        if (!response.ok) {
          throw new Error(data.message || 'An error occurred');
        }
        acceptUser(data.success);
        console.log("accept user??", data.success);
        console.log("the message from server: ", data.message);
      } catch (error) {
        setAuthError(error.message);
      } finally {
        setIsLoading(false);
      }
    }, [setAuthError]);
  
    return { verifyData, isLoading };
  };

// serverpointを作成
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
        const response = await fetch('http://localhost:3001/addFavorites', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ userId: userId, characterId: characterId }),
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
            body: JSON.stringify({ userId: userId, characterId: characterId }),
            credentials: 'include',
        });

        const resData: ServerHasErrorResponse = await response.json();
        console.log(resData.message);
    } catch (error) {
        console.error(error);
    }

}

// ログイン時または新規登録時にセッションの発行
export const generateSession = async () => {
    const userIdInfo = useRecoilValue(userId);
    const response = await fetch('/session-generate', {
        method: 'POST',
        headers: {
            'Content-Type': 'application/json',
        },
        body: JSON.stringify({ userId: userIdInfo }),
        credentials: 'include',
    });

    if (response.ok){
        console.log('Login Successfull');
        // 以下リダイレクトなど実施

    } else {
        // 認証失敗の処理
        
    }

}

export const createImg = (img: Image) => {
    if (!img || !img.path || !img.extension) {
        return ''; // またはデフォルトの画像URLを返す
    }
    return img.path + '.' + img.extension
}


