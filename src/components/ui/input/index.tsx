import { InputHTMLAttributes } from "react";


interface InputProps extends InputHTMLAttributes<HTMLInputElement>{}

export default function Input({...rest}:InputProps){
    return (
        <input type="text" className="input" {...rest} />
    )
}