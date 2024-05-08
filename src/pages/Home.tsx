import React, { useCallback, useState } from 'react';
import styled from 'styled-components';
import { useInputValidation, useVerifyEnteredData } from 'customHooks';
import { Link, useNavigate } from 'react-router-dom';
import { hasAcceptedUser, userId } from 'RecoilAtom';
import { useRecoilState, useRecoilValue, useSetRecoilState } from 'recoil';

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

const Button = styled(Link)`
  margin: 10px;
  padding: 15px 30px;
  background-color: #007bff;
  color: white;
  text-decoration: none;
  border-radius: 5px;
  transition: background-color 0.3s ease;

  &:hover {
    background-color: #0056b3;
  }
`;

// signupボタンのルーティングや処理の実装
export const SignUpPage = () => {
  const routePath = '/mainPage';
  const userIdElement = useInputValidation('');
  const passwordElement = useInputValidation('');
  const [authError, setAuthError] = useState<string>(''); // customhooksに渡す
  const nav = useNavigate();
  const setUserId = useSetRecoilState(userId);
  const [useStatus, setUseStatus] = useRecoilState(hasAcceptedUser);

  const { verifyData, isLoading } = useVerifyEnteredData(setAuthError);  // handleRegisterではなく、server側にリクエスト投げて、jsonデータの取得カスタムフック

  const renderingAct = async () => {
    await verifyData(
      userIdElement.value, 
      passwordElement.value, 
      'new-register', 
      setUseStatus);

      if(useStatus) {
        setUserId(userIdElement.value);
        nav(routePath);
      }
  }

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
      <Input
        type="password"
        placeholder="Password"
        value={passwordElement.value}
        onChange={passwordElement.handleChange}
      />
      {passwordElement.error && <p>{passwordElement.error}</p>}
      {authError && <p>{authError}</p>}
      <Button as="button" to="/signup" onClick={renderingAct}>Sign Up</Button>
      <Button to="/login">Already have an account? Log In</Button>
    </Container>
  );
};


export const LoginPage = () => {
  const routePath = '/mainPage';
  const userIdElement = useInputValidation('');
  const passwordElement = useInputValidation('');
  const [authError, setAuthError] = useState<string>('');
  const nav = useNavigate();
  const setUserId = useSetRecoilState(userId);
  const [useStatus, acceptUser] = useRecoilState(hasAcceptedUser);
  const loginDomain = 'login'
  const { verifyData, isLoading } = useVerifyEnteredData(setAuthError);  // handleRegisterではなく、server側にリクエスト投げて、jsonデータの取得カスタムフック


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
      <Input
        type="password"
        placeholder="Password"
        value={passwordElement.value}
        onChange={passwordElement.handleChange}
      />
      {passwordElement.error && <p>{passwordElement.error}</p>}
      {authError && <p>{authError}</p>}
      <Button as="button" to="/login" onClick={renderingAct}>Log In</Button>
      <Button to="/signup">Don't have an account? Sign Up</Button>
    </Container>
  );
};