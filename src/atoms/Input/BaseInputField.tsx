// 入力欄
import React from "react";
import { InputProps } from "src/type/app";
import styled from "styled-components";

export const InputField: React.FC<InputProps> = ({type, placeholder, value, onChange}) => {
    return(
        <SInput
            type={type}
            placeholder={placeholder}
            value={value}
            onChange={onChange}
        />
    );
};

const SInput = styled.input`

`;