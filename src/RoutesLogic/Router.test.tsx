import React from 'react';
import { render, screen } from '@testing-library/react';
import { MemoryRouter, Route, Routes } from 'react-router-dom';
import { Router } from './Router';
import { CharacterDefault } from "src/pages/CharacterDefault";
import { CharacterDetail } from "src/pages/Detail/CharacterDetail";
import { SignUpPage, LoginPage } from "src/pages/Home";

jest.mock("src/pages/CharacterDefault", () => ({
  CharacterDefault: () => <div>CharacterDefault Page</div>
}));
jest.mock("src/pages/Detail/CharacterDetail", () => ({
  CharacterDetail: () => <div>CharacterDetail Page</div>
}));
jest.mock("src/pages/Home", () => ({
  SignUpPage: () => <div>SignUp Page</div>,
  LoginPage: () => <div>Login Page</div>
}));

describe('Router component', () => {
  it('renders SignUpPage for /signup route', () => {
    render(
      <MemoryRouter initialEntries={['/signup']}>
        <Router />
      </MemoryRouter>
    );
    expect(screen.getByText('SignUp Page')).toBeInTheDocument();
  });

  it('renders LoginPage for /login route', () => {
    render(
      <MemoryRouter initialEntries={['/login']}>
        <Router />
      </MemoryRouter>
    );
    expect(screen.getByText('Login Page')).toBeInTheDocument();
  });

  it('renders CharacterDefault for /character route', () => {
    render(
      <MemoryRouter initialEntries={['/character']}>
        <Router />
      </MemoryRouter>
    );
    expect(screen.getByText('CharacterDefault Page')).toBeInTheDocument();
  });

  it('renders CharacterDetail for /character/detail route', () => {
    render(
      <MemoryRouter initialEntries={['/character/detail']}>
        <Router />
      </MemoryRouter>
    );
    expect(screen.getByText('CharacterDetail Page')).toBeInTheDocument();
  });
});

