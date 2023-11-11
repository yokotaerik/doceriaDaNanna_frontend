import Input from '@/components/ui/input'
import Image from 'next/image'
import logo from '@/../public/logoNanna.png'
import Button from '@/components/ui/button'
import { useContext, useState } from 'react'
import { AuthContext } from '@/contexts/authContext'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { canSSRGuest } from '@/utils/canSSRGuest'
import Head from 'next/head'

export default function Cadastro() {

  const { signUp } = useContext(AuthContext)

  const [name, setName ] = useState('')
  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')
  const [confirmPassword, setConfirmPassword] = useState('')


  const [loading, setLoading] = useState(false)

  async function handleSignUp(e: React.FormEvent<HTMLFormElement>): Promise<void>{
    e.preventDefault()

    if (email == '' || password == '' || name == ''){
      toast.warning("Preencha os campos")
      return
    }

    if (confirmPassword != password){
      toast.warning("Senha não confere")
      return
    }

    setLoading(true)

    let data = {
      name, 
      email,
      password,
    }

    await signUp(data)

    setLoading(false)

  }

  return (
    <>
    <Head>
      <title> Cadastro </title>
    </Head>
    <div className='colCenter min-h-screen'>
      <div className='colCenter w-72 md:w-[26rem]'>
        <Image
        src={logo}
        alt="Picture of the author"
        className='border-8 border-pink-600 mb-8'
        />
        <h1 className='title mb-4'> Criando sua conta </h1>
        <form className='colCenter w-5/6' onSubmit={handleSignUp}>
          <Input placeholder='Digite seu nome' type='text' value={name} onChange={ (e) => setName(e.target.value)}/>
          <Input placeholder='Digite seu e-mail' type='text'  value={email} onChange={ (e) => setEmail(e.target.value)}/>
          <Input placeholder='Digite sua senha' type='password' value={password} onChange={ (e) => setPassword(e.target.value)}/>
          <Input placeholder='Confirme sua senha' type='password' value={confirmPassword} onChange={ (e) => setConfirmPassword(e.target.value)}/>
          <Button type='submit' loading={loading}> Acessar </Button>
        </form>
        <Link href="/" className='mt-4'>Já possui uma conta? Entre </Link>
      </div>
    </div>
    </>
  )
}

export const getServerSideProps = canSSRGuest(async (ctx) => {
  return {
    props: {}
  }
})