import React from "react";
import styled from "styled-components";

interface btnProps {
    children: string,
    btnColor: string
}

const SButton = styled.button<{ btnColor: string}>`
    background: ${props => props.btnColor};
    color: white;
    font-size: 1rem;
    padding: 0.75em 1.5em;
    border: none;
    border-radius: 30px;
    cursor: pointer;
    box-shadow: 0 3px 6px rgba(0, 0, 0, 0.16);
    transition: background-color 0.3s ease-in-out, box-shadow 0.3s ease-in-out;

    &:hover {
        background-color: #0056b3;
        box-shadow: 0 5px 12px rgba(0, 0, 0, 0.2);
    }
`;

export const BaseBtn: React.FC<btnProps> = ({children, btnColor}) => {

    return (
        <SButton btnColor={ btnColor }>{ children }</SButton>
    );
}


/*
const SContainer = styled.div`
    display: flex;
    justify-content: center;
    padding: 2em;
`;

*/ 