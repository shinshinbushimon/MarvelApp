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
    border: none; /* ボーダーを消す */
    outline: none; /* クリック時のアウトラインを消す */
    padding: 10px 15px;
    font-size: 16px; /* 読みやすいフォントサイズに */
    border-radius: 15px; /* インプットフィールドの角も丸く */
    width: 100%; /* 可能な限りの幅を使用 */
`;