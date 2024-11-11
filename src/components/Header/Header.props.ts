import { HTMLAttributes, ReactNode } from "react";

export interface HeaderProps extends HTMLAttributes<HTMLHeadElement> {
    children: ReactNode
}