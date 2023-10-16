import { ReactNode, ButtonHTMLAttributes } from "react";
import { FaSpinner } from "react-icons/fa";

interface ButtonProps extends ButtonHTMLAttributes<HTMLButtonElement> {
    loading?: boolean,
    children: ReactNode,
}


export default function Button({children, loading, ...rest }: ButtonProps){
    return (
        <button 
        className="bg-pink-500 max-w-xl p-2 border-0 rounded w-full text-pink-50 font-bold"
        disabled={loading}
        >
            { loading ? (
                <FaSpinner color="FFF" size={20} className="animate-spin" />
            ) : (
                <a> {children} </a>
            )}
        </button>
    )
}