import React from "react";
import { LabelProps } from "src/type/app";

export const Label: React.FC<LabelProps> = ({title}) => (
    <p>{title}</p>
);