import { Character } from "./Character"
import React from "react";
import { Comic } from "./Comic";
import { Creator } from "./Creators";
import { Event } from "./Event";
import { Series } from "./Series";
import { MarvelElement } from "./Common";

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

export interface btnProps {
    children: string,
    btnColor: string,
    onClick: () => void
}

export interface InputProps {
    type: string,
    placeholder?: string,
    value?: string,
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface CheckInputProps extends InputProps{
    label: string,
    checked: boolean,
}

export interface IconProps {
    name: string,
    onClick?: ()=> void
}

export interface ImageProps {
    src: string,
    alt: string
}

export interface LabelProps {
    title: string,
    text?: string
}

export interface LinkProps {
    to: string,
    children: React.ReactNode
}

export interface SelectProps {
    options: { value: string; label: string }[];
    onChange: (event: React.ChangeEvent<HTMLSelectElement>) => void
}

export interface CheckboxProps {
    label: string;
    checked: boolean;
    onChange: (event: React.ChangeEvent<HTMLInputElement>) => void
}

export interface ListHeaderProps {
    onSearch: (query: string) => void
}

export interface SearchSet {
    value: string,
    onChange: (value: string) => void
}