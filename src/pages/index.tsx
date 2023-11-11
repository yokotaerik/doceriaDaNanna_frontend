import Image from 'next/image'
import { Inter } from 'next/font/google'
import logo from '@/../public/logoNanna.png'
import { useContext, useState } from 'react'
import { AuthContext } from '@/contexts/authContext'
import Button from '@/components/ui/button'
import Input from '@/components/ui/input'
import Link from 'next/link'
import { toast } from 'react-toastify'
import { canSSRGuest } from '@/utils/canSSRGuest'
import Head from 'next/head'

const inter = Inter({ subsets: ['latin'] })

export default function Home() {

  const { signIn } = useContext(AuthContext)

  const [email, setEmail] = useState('')
  const [password, setPassword] = useState('')

  const [loading, setLoading] = useState(false)



  async function handleLogin(e: React.FormEvent<HTMLFormElement>): Promise<void>{
    e.preventDefault()

    
    if (email == '' || password == ''){
      toast.warning("Preencha os campos")
      return
    }
    
    setLoading(true)

    let data = {
      email,
      password,
    }

    await signIn(data)

    setLoading(false)

  }

  return (
    <>
     <Head>
          <title> Acesso </title>
      </Head>
    <div className='colCenter min-h-screen'>
      <div className='colCenter w-72 md:w-[26rem]'>
        <Image
        src={logo}
        alt="Picture of the author"
        className='border-8 border-pink-600 m-8'
        />
        <form onSubmit={handleLogin} className='colCenter w-5/6'>
          <Input placeholder='Digite seu e-mail' type='text' value={email} onChange={ (e) => setEmail(e.target.value)}/>
          <Input placeholder='Digite sua senha'  type='password' value={password} onChange={ (e) => setPassword(e.target.value)}/>
          <Button type='submit' loading={loading}> Acessar </Button>
        </form>
        <Link href="/cadastro" className='mt-8'> Não possui uma conta? Cadastre-se</Link>
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
