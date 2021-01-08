import React, { useState, useEffect } from 'react';

import { Conteiner, OrderList } from './styled';
import OrderItem from '../../components/OrdemItem';
import Header from '../../components/Header';
import Modal from '../../components/Modal'
import ModalOrdem from '../../components/ModalOrdem'
import useApi from '../../Helpers/AppharmaApi'
import { useSelector } from 'react-redux'
import io from 'socket.io-client';
const socket = io('wss://approachmobile.company');

let timeoutId;

function OrderScreen() {
    const api = useApi()
    const [focus, setFocus] = useState(true) 
    const [headerSearch, setHeaderSearch] = useState('');
    const [codCompra, setCodCompra] = useState('');
    const [modalActive, setModalActive] = useState(false);
    const [listaDePedidos, setListaDePedidos] = useState([])
    const token = useSelector(state => state.userReducer.token);
    
    
    
    
    useEffect(()=>{

        let unmontd = false;
        
        socket.on('tem-venda', (codigoVenda) => {
            console.log("Recebi uma venda.. tenho que abrir alguma coisa para alertar o usuario... ")
            const audio = new Audio('/assets/caixa_alerta.mp3')
            
            let counter;
            const blink = () => {
                counter++;
                audio.play()
                if(!unmontd){
                    reloadList();
                }
                const msg = '!!! A T E N Ç Ã O !!!';
                const oldTitle = ' !! Você tem um novo pedido !!  ';
                document.title = document.title == msg ? oldTitle : msg;
                if (document.hasFocus() || counter == 10) {
                    document.title = "R E T A G U A R D A  - [ Appharma ]";
    
                    clearInterval(timeoutId);
                    timeoutId = ''
                }
            }
    
            if (!timeoutId && (!document.hasFocus())) {
                timeoutId = setInterval(blink, 250);
            };
    
        })

        return () =>{
            unmontd = true;
        }

    }, [])




    useEffect(() => {

        reloadList()

    }, [])

    const removeList = (codigo_venda) => {
        console.log("Eu vou remover o: " + codigo_venda)
        let novaLista = listaDePedidos.filter(i => i.codigo_venda != codigo_venda)
        setListaDePedidos(novaLista)
    }

    const reloadList = async () => {

        let unmounted = false

        if (!unmounted){
            const r = await api.getVendas(token)
            setListaDePedidos(r)
        }

        return () => unmounted = true;
        
    }


    return (
        <Conteiner>
            <Header search={headerSearch} onSearch={setHeaderSearch} title="Tela de Pedidos" whatSearch="Digite o CPF do cliente" />

            <OrderList>
                {
                    listaDePedidos.map((i, k) => {
                        return <OrderItem key={k} data={i} itemList={setModalActive} setCodCompra={setCodCompra} reloadList={reloadList} removeList={removeList}  />
                    })
                }
            </OrderList>

            <Modal active={modalActive} setActive={setModalActive}  >
                <ModalOrdem codOrdem={codCompra} />
            </Modal>

        </Conteiner>
    )
}

export default OrderScreen;