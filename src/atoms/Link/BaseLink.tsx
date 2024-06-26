import React from "react";
import { Link } from "react-router-dom";
import { LinkProps } from "src/type/app";
import styled from "styled-components";

const SLink = styled(Link)`
    display: inline-block;
    transition: transform 0.3s ease;
    text-decoration: none; /* リンクの下線を取り除く */
    color: inherit;

    &:hover {
        transform: translateX(10px);
    }
`;

export const CustomLink: React.FC<LinkProps> = ({to, children, className}) => (
    <SLink to={to} className={className}>{children}</SLink>
);