import { ReactNode } from "react"

type Divprops={
    children:ReactNode;
    widthClass?:string,
    heightClass?:string,
    className?:string
}
export default function Div({
    children,
    widthClass= 'w-96',
    heightClass= 'h-80',
    className = ''
}:Divprops){
    return (
        <div className={`bg-black text-white p-2 ${widthClass} ${heightClass} ${className}`}>
            {children}
        </div>
    )
}