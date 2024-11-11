import { HTMLAttributes, ReactNode } from "react";

export interface TextProps extends HTMLAttributes<HTMLParagraphElement>{
    children: ReactNode,
    size: "small" | "medium"
}