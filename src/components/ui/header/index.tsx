import Image from "next/image";
import Link from "next/link";
import logo from '@/../public/logoNanna.png'

import { useContext } from 'react'
import { FiLogOut } from 'react-icons/fi'
import { AuthContext } from "@/contexts/authContext";


export default function Header(){

    const { user } = useContext(AuthContext)

    return (
        <header>
            <nav className="flex justify-center md:justify-between bg-pink-400 bg-opacity-40 px-5 py-3">

            <div>
                <Link href="/"> <h1 className="md:hidden px-10"> Home </h1><Image src={logo} alt="logo" className=" h-14 w-auto border-4 border-pink-600 hidden md:block "/></Link>
            </div>

            <div className="flex gap-10 items-center">
                <Link href="/categoria">
                    Nova categoria
                </Link>

                <Link href="/produto">
                    Cardapio
                </Link>

                <button>
                    <FiLogOut color="#000" size={24} />
                </button>
            </div>
            </nav>
            
            <div className="flex w-full justify-center">
            <h1 className="text-2xl font-bold p-14"> Ola, { user?.name }!</h1>
            </div>
        </header>
    )
}