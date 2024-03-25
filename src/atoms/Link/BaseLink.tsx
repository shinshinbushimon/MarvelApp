import React from "react";
import { Link } from "react-router-dom";
import { LinkProps } from "src/type/app";

export const CustomLink: React.FC<LinkProps> = ({to, children}) => (
    <Link to={to}>{children}</Link>
);