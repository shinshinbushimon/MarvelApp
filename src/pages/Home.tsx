import React, { useCallback, useEffect, useState } from 'react';
import styled from 'styled-components';
import { useInputValidation, useVerifyEnteredData } from 'customHooks';
import { Link, useNavigate } from 'react-router-dom';
import { hasAcceptedUser, userId } from 'RecoilAtom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';
import { ServerErrors } from 'src/type/app';

const Container = styled.div`
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100vh;
  background-color: #f0f0f0;
`;

const Input = styled.input`
  margin-bottom: 20px;
  padding: 10px;
  width: 50%;
  border: 2px solid #007bff;
  border-radius: 5px;
`;

const Button = styled.button<{ disbled?: boolean }>`
  margin: 10px;
  padding: 15px 30px;
  background-color: ${({ disabled }) => (disabled ? '#d3d3d3' : '#007bff')};
  color: ${({ disabled }) => (disabled ? '#a9a9a9' : 'white')};
  text-decoration: none;
  border-radius: 5px;
  border: none;
  cursor: ${({ disabled }) => (disabled ? 'not-allowed' : 'pointer')};
  transition: background-color 0.3s ease;

  &:hover {
    background-color: ${({ disabled }) => (disabled ? '#d3d3d3' : '#0056b3')};
  }
`;
// signupボタンのルーティングや処理の実装
export const SignUpPage = () => {
  const routePath = '/mainPage';
  const userIdElement = useInputValidation('');
  const passwordElement = useInputValidation('');
  const [authError, setAuthError] = useState<ServerErrors[]>([]); // customhooksに渡す
  const nav = useNavigate();
  const setUserId = useSetRecoilState(userId);
  const [useStatus, setUseStatus] = useRecoilState(hasAcceptedUser);

  const { verifyData, isLoading } = useVerifyEnteredData(setAuthError);  // handleRegisterではなく、server側にリクエスト投げて、jsonデータの取得カスタムフック

  const renderingAct = async () => {
    const isVerified = await verifyData(
        userIdElement.value, 
        passwordElement.value, 
        'new-register', 
        setUseStatus
    );

    if (isVerified) {
        setUserId(userIdElement.value);
        nav(routePath);
    }
}
const renderErrorMessages = (path: string) => {
  return authError
      .filter(error => error.path === path)
      .map((error, index) => <p key={index}>{error.msg}</p>);
};

const isButtonDisabled = !userIdElement.value || !passwordElement.value || userIdElement.error || passwordElement.error;

return (
    <Container>
        <h2>Sign Up</h2>
        <Input
            type="text"
            placeholder="User ID"
            value={userIdElement.value}
            onChange={userIdElement.handleChange}
        />
        {userIdElement.error && <p>{userIdElement.error}</p>}
        {renderErrorMessages('username')}
        <Input
            type="password"
            placeholder="Password"
            value={passwordElement.value}
            onChange={passwordElement.handleChange}
        />
        {passwordElement.error && <p>{passwordElement.error}</p>}
        {renderErrorMessages('password')}
        <Button onClick={renderingAct} disabled={isButtonDisabled !== ''}>
          Sign up
        </Button>
        <Button as={Link} to="/login">Already have an account? Log In</Button>
    </Container>
);
};


export const LoginPage = () => {
  const routePath = '/mainPage';
  const userIdElement = useInputValidation('');
  const passwordElement = useInputValidation('');
  const [authError, setAuthError] = useState<ServerErrors[]>([]);
  const nav = useNavigate();
  const setUserId = useSetRecoilState(userId);
  const [useStatus, acceptUser] = useRecoilState(hasAcceptedUser);
  const loginDomain = 'login'
  const { verifyData } = useVerifyEnteredData(setAuthError);  // handleRegisterではなく、server側にリクエスト投げて、jsonデータの取得カスタムフック

  const [isButtonDisabled, setIsButtonDisabled] = useState(true);

  useEffect(() => {
    const checkButtonState = () => {
      const hasError = Boolean(userIdElement.error) || Boolean(passwordElement.error);
      const isEmpty = !userIdElement.value || !passwordElement.value;
      setIsButtonDisabled(hasError || isEmpty);
    };

    checkButtonState();
  }, [userIdElement.value, userIdElement.error, passwordElement.value, passwordElement.error]);

  // handleRegisterではなく、server側にリクエスト投げて、jsonデータの取得カスタムフック
  if(useStatus) {
    setUserId(userIdElement.value);
    nav(routePath);
  }

  const renderingAct = async () => {
    await verifyData(
      userIdElement.value, 
      passwordElement.value, 
      loginDomain, 
      acceptUser);
      
      if(useStatus) {
        setUserId(userIdElement.value);
        nav(routePath);
      }
    }

    const renderErrorMessages = (path: string) => {
      return authError
          .filter(error => error.path === path)
          .map((error, index) => <p key={index}>{error.msg}</p>);
    };    


  return (
    <Container>
      <h2>Log In</h2>
      <Input
        type="text"
        placeholder="User ID"
        value={userIdElement.value}
        onChange={userIdElement.handleChange}
      />
      {userIdElement.error && <p>{userIdElement.error}</p>}
      {renderErrorMessages('username')}
      <Input
        type="password"
        placeholder="Password"
        value={passwordElement.value}
        onChange={passwordElement.handleChange}
      />
      {passwordElement.error && <p>{passwordElement.error}</p>}
      {renderErrorMessages('password')}
      <Button onClick={renderingAct} disabled={isButtonDisabled}>
          Log in
        </Button>
        <Button as={Link} to="/signup">Already have an account? Sign Up</Button>
    </Container>
  );
};