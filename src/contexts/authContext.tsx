
import { createContext, ReactNode, useState } from "react";

import { api } from "@/services/apiClient";

import { destroyCookie, setCookie, parseCookies } from "nookies"
import Router from "next/router";
import { toast } from "react-toastify";

type AuthContextData = {
    user?: UserProps;
    isAuthenticated: boolean;
    signIn: (credentials: SignProps) => Promise<void>
    signOut: () => void
    signUp: (credentials: SignUpProps) => Promise<void>

}

type UserProps = {
    id: string;
    name: string;
    email: string
}

type SignProps = {
    email: string;
    password: string;
}

type SignUpProps = {
    name: string
    email: string;
    password: string;
}

type AuthProviderProps = {
    children: ReactNode
}


export const AuthContext = createContext({} as AuthContextData)


export function signOut(){
    try{
        destroyCookie(undefined, '@nextauth.token')
        Router.push('/')
    }catch{
      console.log('Erro ao deslogar')  
    }
}


export function AuthProvider({ children }: AuthProviderProps ){
    const [user, setUser ] = useState<UserProps>()
    const isAuthenticated = !!user

    async function signIn({email, password}: SignProps) {
        try{
            const response = await api.post('/login', {
                email,
                password
            })

            const { id, name ,token } = response.data

            setCookie(undefined, '@nextauth.token', token, {
                maxAge: 60 * 60 * 24,
                path: "/"
            })

            setUser({
                id,
                name,
                email,
            })

            api.defaults.headers['Authorization'] = `Bearer ${token}`

            toast.success('Logado com sucesso')

            Router.push('/dashboard')

        }catch(err){
            toast.error('Erro ao acessar')
            console.log("Erro ao acessar", err)
        }
    }

    async function signUp({email, password, name}: SignUpProps) {
        try{
            const response = await api.post('/user', {
                name,
                email,
                password

            })

            toast.success('Cadastrado com sucesso')

            Router.push('/')

        }catch(err){
            toast.error('Erro ao cadastrar')
            console.log("Erro ao cadastrar", err)

        }
    }

    return (
        <AuthContext.Provider value={{ user, isAuthenticated, signIn , signOut, signUp}}>
            {children}
        </AuthContext.Provider>
    )
}