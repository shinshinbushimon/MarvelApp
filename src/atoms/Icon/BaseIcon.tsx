import React from "react";
import { IconProps } from "src/type/app";

// お気に入り機能で使用
export const Icon: React.FC<IconProps> = ({name, onClick}) => (
    <i className={`${name}-icon`} onClick={onClick}></i>
);