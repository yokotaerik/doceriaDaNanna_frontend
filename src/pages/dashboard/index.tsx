import Header from "@/components/ui/header"
import { setupAPIClient } from "@/services/api"
import { canSSRAuth } from "@/utils/canSSRAuth"
import { GetServerSidePropsContext } from "next"
import Head from "next/head"
import { useState } from "react"
import { FiRefreshCcw } from "react-icons/fi"
import Modal from 'react-modal';
import ModalOrder from "@/components/ui/modalOrder"

type OrderProps = {
  id: string;
  table: string | number;
  status: boolean;
  draft: boolean;
  name: string | null;
}

interface HomeProps{
  orders: OrderProps[];
}

export type OrderItemProps = {
  id: string;
  amount: number;
  order_id: string;
  product_id: string;
  product:{
    id: string;
    name: string;
    description: string;
    price: string;
    banner: string;
  }
  order:{
    id: string;
    table: string | number;
    status: boolean;
    name: string | null;
  }
}


export default function Dashboard({ orders }: HomeProps) {

    console.log( orders )

    const [orderList, setOrderList] = useState(orders || [])
    const [modalIsOpen, setIsOpen] = useState(false)
    const [modalItem, setModalItem] = useState<OrderItemProps[]>()

    
    function closeModal() {
      setIsOpen(false);
    }

    async function openModal(id: string) {
      const apiClient = setupAPIClient()

      const response = await apiClient.get('/order/detail', {
        params: {
          order_id: id,
        }
      })

      console.log(response.data)

      setModalItem(response.data)
      setIsOpen(true);
    }

    async function sendOrder(id: string){
      const apiClient = setupAPIClient()

      await apiClient.put('/order/finish', {
          order_id: id
      })

      const response = await apiClient.get('/order')


      setOrderList(response.data  )

      setIsOpen(false);
    }

    async function handleRefresh(){
      const apiClient = setupAPIClient()
      
      const response = await apiClient.get('/order')


      setOrderList(response.data  )
    }


    Modal.setAppElement('#__next');

    return (
      <>
        <Head>
          <title> Painel </title>
        </Head>
        <Header/>

        <main className="colCenter">
          <div className="colCenter w-72 md:w-[42rem]">
            <div className="flex w-full justify-between mb-5">
              <h1 className="title"> Ultimos pedidos</h1>
              <button onClick={() => handleRefresh()}>
                <FiRefreshCcw size={25}/>
              </button>
            </div>

              {orderList.length === 0 && (
                <span> Nenhum pedido ativo </span>
              )}

              {orderList.map(( order ) => (
                    <section key={order.id} className="w-full my-2">
                      <button className="orderItem" onClick={ () => openModal(order.id)}>
                        <div className="tag"></div>
                        <span className="text-rose-50">{order.table}</span>
                      </button>
                  </section>
              ))}

          </div>
        </main>

                { modalIsOpen &&  (
                  <ModalOrder isOpen={modalIsOpen} onRequestClose={closeModal} order={modalItem} sendOrder={sendOrder}/>
                )}

      </>
    )
}

export const getServerSideProps = canSSRAuth(async (ctx: any) => {
    const apiClient = setupAPIClient(ctx)

    const response = await apiClient.get('/order')

    console.log(response.data)

    return {
      props: {
        orders: response.data
      }
    }
  })