import Button from "@/components/ui/button"
import Header from "@/components/ui/header"
import Input from "@/components/ui/input"
import { api } from "@/services/apiClient"
import { canSSRAuth } from "@/utils/canSSRAuth"
import Head from "next/head"
import { useState } from "react"
import { toast } from "react-toastify"

export default function Categoria() {

    const [name, setName] = useState('')

    async function handleRegister(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault()

      if(name === ''){
        toast.warning('Nome invalido')
        return
      }

      await api.post('/category', { name })

      toast.success('Criada com sucesso')
    }

    return (
      <>
        <Head>
          <title> Painel </title>
        </Head>
        <Header/>

        <main className="colCenter">
          <div className="colCenter w-72 md:w-[42rem]">

            <h1 className="title mb-10"> Cadastrar categoria</h1>

            <form onSubmit={handleRegister} className="colCenter w-5/6">
              <Input
               type="text" 
               placeholder="Digite o nome da categoria!"
               value={name}
               onChange={(e) => setName(e.target.value)}
               />
              <Button> Cadastrar </Button>
            </form>
          </div>

        </main>
      </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx) => {
    return {
      props: {}
    }
  })