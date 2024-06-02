import React, { useState } from 'react';
import styled from 'styled-components';
import { useInputValidation, useVerifyEnteredData } from 'customHooks';
import { Link, useNavigate } from 'react-router-dom';
import { userId } from 'RecoilAtom';
import { useSetRecoilState } from 'recoil';
import { ServerErrors } from 'src/type/app';
import { CookiePermission } from 'src/molecules/PermissionItem/CookiePermission';

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

export const SignUpPage = () => {
  const routePath = '/mainPage';
  const minLen = 5;
  const userIdElement = useInputValidation('');
  const passwordElement = useInputValidation('');
  const [authError, setAuthError] = useState<ServerErrors[]>([]);
  const nav = useNavigate();
  const setUserId = useSetRecoilState(userId);
  const [isPermitted, setIsPermitted] = useState(false);

  const { verifyData, isLoading } = useVerifyEnteredData(setAuthError);  

  const renderingAct = async () => {
    const isVerified = await verifyData(
        userIdElement.value, 
        passwordElement.value, 
        'new-register',
        isPermitted
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

const isButtonDisabled = (minimumLen: number) => {
  const HasUsernameProblem = (userIdElement.value.length < minimumLen) || userIdElement.error.length > 0;
  const HasPasswordProblem = (passwordElement.value.length < minimumLen) || passwordElement.error.length > 0;
  return HasUsernameProblem || HasPasswordProblem;
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
        {renderErrorMessages('username')}
        <Input
            type="password"
            placeholder="Password"
            value={passwordElement.value}
            onChange={passwordElement.handleChange}
        />
        {passwordElement.error && <p>{passwordElement.error}</p>}
        {renderErrorMessages('password')}
        <Button onClick={renderingAct} disabled={isButtonDisabled(minLen)}>
          Sign up
        </Button>
        <Button as={Link} to="/login">既にアカウントをお持ちですか？ Log In</Button>
        <CookiePermission isPermitted={isPermitted} setIsPermitted={setIsPermitted} />
    </Container>
);
};


export const LoginPage = () => {
  const routePath = '/mainPage';
  const minLen = 5;
  const userIdElement = useInputValidation('');
  const passwordElement = useInputValidation('');
  const [authError, setAuthError] = useState<ServerErrors[]>([]);
  const nav = useNavigate();
  const setUserId = useSetRecoilState(userId);
  const loginDomain = 'login';
  const { verifyData, isLoading } = useVerifyEnteredData(setAuthError);
  const [isPermitted, setIsPermitted] = useState(false);

  const renderingAct = async () => {
    const isVerified = await verifyData(
      userIdElement.value, 
      passwordElement.value, 
      loginDomain,
      isPermitted
    );
    if (isVerified) {
      setUserId(userIdElement.value);
      nav(routePath);
    }
  };

  const renderErrorMessages = (path: string) => {
    return authError
      .filter(error => error.path === path)
      .map((error, index) => <p key={index}>{error.msg}</p>);
  };

  const isButtonDisabled = (minimumLen: number) => {
    const HasUsernameProblem = (userIdElement.value.length < minimumLen) || userIdElement.error.length > 0;
    const HasPasswordProblem = (passwordElement.value.length < minimumLen) || passwordElement.error.length > 0;
    return HasUsernameProblem || HasPasswordProblem;
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
      <Button onClick={renderingAct} disabled={isButtonDisabled(minLen)}>
        Log in
      </Button>
      <Button as={Link} to="/signup">アカウントを持っていませんか？ Sign Up</Button>
      <CookiePermission isPermitted={isPermitted} setIsPermitted={setIsPermitted} />
    </Container>
  );
};