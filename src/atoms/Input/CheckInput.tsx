import React from "react";
import { CheckInputProps } from "src/type/app";
import styled from "styled-components";

export const CheckInput: React.FC<CheckInputProps> = ({label, checked, onChange}) => (
    <label>
        <input type="checkbox" checked={checked} onChange={onChange} />
        {label}
    </label>
);