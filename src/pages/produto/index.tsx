import Button from "@/components/ui/button"
import Header from "@/components/ui/header"
import Input from "@/components/ui/input"
import { setupAPIClient } from "@/services/api"
import { canSSRAuth } from "@/utils/canSSRAuth"
import Head from "next/head"
import { useState } from "react"
import { FiUpload } from "react-icons/fi"
import { toast } from "react-toastify"

type ItemProps = {
  id: string;
  name: string;
}

interface CategoryProps{
  categoryList: ItemProps[];
}


export default function Produto({ categoryList }: CategoryProps) {

    console.log(categoryList)

    const [name, setName] = useState('')
    const [price, setPrice] = useState('')
    const [description, setDescription] = useState('')
    const [categories, setCategories] = useState(categoryList || [])
    const [categorySelected, setCategorySelected] = useState(0)


    const [fileUrl, setFileUrl] = useState('')
    const [file, setFile] = useState<File | null>(null)

    async function handleRegister(e: React.FormEvent<HTMLFormElement>){
      e.preventDefault()

      try{
        const data = new FormData()

        if(name === '' || price === '' || description === '' || file === null){
          toast.warning('Preencha todos os campos')
          return
        }
  
        data.append('name', name)
        data.append('price', price)
        data.append('description', description)
        data.append('file', file)
        data.append('category_id', categories[categorySelected].id)

        const apiClient = setupAPIClient()

        await apiClient.post('/product', data)
  
        toast.success('Criada com sucesso')
      }catch(err){
        toast.error('Erro ao cadastrar!')
      }
    }

    function handleFile(e: React.ChangeEvent<HTMLInputElement>) {

      if (!e.target.files){
        return
      }

      const image = e.target.files[0]

      if(!image){
        return
      }

      if(image.type === `image/jpeg` || image.type === 'image/png'){
        setFile(image)
        setFileUrl(URL.createObjectURL(e.target.files[0]))
      }
  
    }

    function handleCategoryList(e: React.ChangeEvent<HTMLSelectElement>) {
      setCategorySelected(Number(e.target.value))
    }

    return (
      <>
        <Head>
          <title> Painel </title>
        </Head>
        <Header/>

        <main className="colCenter">
          <div className="colCenter w-72 md:w-[42rem]">

            <h1 className="title mb-10"> Cadastrar produto</h1>

            <form onSubmit={handleRegister} className="colCenter w-5/6">

              <label className="w-full h-72 mb-4 border-pink-500 border-2 rounded bg-pink-50 cursor-pointer flex justify-center items-center">
                <span className="z-10 absolute opacity-30 duration-300 hover:scale-125 hover:opacity-100">
                  <FiUpload size={25} />
                </span>

                <input type="file" accept="image/png, image/jpeg" className="hidden" onChange={handleFile}/>
                
                {fileUrl && (
                  // eslint-disable-next-line @next/next/no-img-element
                  <img 
                  src={fileUrl}
                  alt="Foto do produto"
                  width={250}
                  height={250}
                  className="w-full h-full object-cover rounded"
                  />
                )}


              </label>

              <select className="input" value={categorySelected} onChange={handleCategoryList}>
                  {categories.map((item, index) => {
                      return(
                        <option value={index} key={item.id}> {item.name} </option>
                      )
                  })}
              </select>


              <Input
               type="text" 
               placeholder="Digite o nome do produto!"
               value={name}
               onChange={(e) => setName(e.target.value)}
               />
              <Input
               type="text" 
               placeholder="Digite o valor do produto!"
               value={price}
               onChange={(e) => setPrice(e.target.value)}
               />
              <textarea
               placeholder="Digite a descrição do produto!"
               className="input resize-none"
               value={description}
               onChange={(e) => setDescription(e.target.value)}
               />
              <Button> Cadastrar </Button>
            </form>
          </div>

        </main>
      </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx: any) => {

    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/category')

    return {
      props: {
        categoryList: response.data
      }
    }
  })
