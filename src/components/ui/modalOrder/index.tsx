import { OrderItemProps } from "@/pages/dashboard"
import { FiX } from "react-icons/fi";
import Modal from 'react-modal';
import Button from "../button";


interface ModalOrderProps{
    isOpen: boolean;
    onRequestClose: () => void;
    order: OrderItemProps[]
    sendOrder: (id: string) => void;
  }

export default function ModalOrder({isOpen, onRequestClose, order, sendOrder}: ModalOrderProps){

    const customStyles = {
        content: {
          top: '50%',
          left: '50%',
          right: 'auto',
          bottom: 'auto',
          padding: '30px',
          transform: 'translate(-50%, -50%)',
          backgroundColor: 'rgb(251 207 232 / var(--tw-bg-opacity))',
        },
      };

    return (
        <Modal
        isOpen={isOpen}
        onRequestClose={onRequestClose}
        style={customStyles}
        >
                <button
                type="button"
                onClick={onRequestClose}
                className="react-modal-close"
                style={{ background: 'transparent', border:0}}
                >
                    <FiX size={45}/>
                </button>

                <div className="w-[600px]">
                    <h1 className="title pb-3"> Detalhes do pedido </h1>
                    <span className="font-bold"> Mesa: {order[0].order.table} </span>
                    {order.map(( item ) => (
                        <section key={item.id} className="pt-1">
                            <span>{item.amount} - <strong className="text-pink-700"> {item.product.name} </strong></span> <br/>
                            <span> {item.product.description}</span>
                        </section>
                    ))}
                </div>

                <button className="rounded bg-pink-500 text-pink-50 p-2 mt-3" 
                onClick={() => sendOrder(order[0].order_id)}> Concluir pedido</button>
        </Modal>
    )
}