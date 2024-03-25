import React from "react";
import { Link } from "react-router-dom";
import { LinkProps } from "src/type/app";
import styled from "styled-components";

const SLink = styled(Link)`
    display: inline-block;
    transition: transform 0.3s ease;

    &:hover {
        transform: translateX(10px);
    }
`;

export const CustomLink: React.FC<LinkProps> = ({to, children}) => (
    <SLink to={to}>{children}</SLink>
);