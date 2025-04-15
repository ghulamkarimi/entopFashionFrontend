import { ReactNode } from "react";

interface IMaxWithWrapperProps{
    children:ReactNode;
    className?:string
}
const MaxWithWrapper = ({children,className}:IMaxWithWrapperProps) => {
    return (
        <div className={`mx-auto w-full max-w-screen-5xl px-2.5 md:px-10 xl:px-36 ${className}`}>
            {children}
        </div>
    );
}

export default MaxWithWrapper;