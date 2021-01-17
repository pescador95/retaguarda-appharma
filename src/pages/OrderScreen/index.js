import React, { useState, useEffect } from 'react';

import { Conteiner, OrderList } from './styled';
import OrderItem from '../../components/OrdemItem';
import Header from '../../components/Header';
import Modal from '../../components/Modal'
import ModalOrdem from '../../components/ModalOrdem'
import useApi from '../../Helpers/AppharmaApi'
import { useSelector, useDispatch } from 'react-redux'
import database from '../../Helpers/Firebase'
// import io from 'socket.io-client';
// const socket = io('https://astrofarma.approachmobile.company');

let numeroVenda = 0;
let timeoutId;


function OrderScreen() {
    const api = useApi()
    const [focus, setFocus] = useState(true)
    const [tipoEntrega, setTipoEntrega] = useState('')
    const [headerSearch, setHeaderSearch] = useState('');
    const [codCompra, setCodCompra] = useState('');
    const [modalActive, setModalActive] = useState(false);
    const [listaDePedidos, setListaDePedidos] = useState([])
    const token = useSelector(state => state.userReducer.token);
    const dispatch = useDispatch()

    const getDb = async () => {
        await database.child('vendas').on('value', snap => {
            var valor = snap.val().numero
            console.log("Valor: " + valor)
            if (valor > numeroVenda && numeroVenda > 0) {
                const audio = new Audio('/assets/caixa_alerta.mp3')
                let counter;
                const blink = () => {
                    counter++;
                    audio.play()
                    const msg = '!!! A T E N Ç Ã O !!!';
                    const oldTitle = ' !! Você tem um novo pedido !!  ';
                    document.title = document.title == msg ? oldTitle : msg;
                    if (document.hasFocus() || counter == 10) {
                        document.title = "R E T A G U A R D A  - [ Appharma ]";
                        reloadList()
                        clearInterval(timeoutId);
                        timeoutId = ''

                    }
                }

                if (!timeoutId && (!document.hasFocus())) {
                    timeoutId = setInterval(blink, 250);

                };

            }
            numeroVenda = valor;

        })
    }

    useEffect(() => {
        getDb();
    }, [])

    useEffect(() => {
        const carregaParametros = async () => {
            const resp = await api.getConfigs(token)
            if (resp.error) {
                console.log("Não consegui carregar info: " + resp.error.message)
                return
            }

            dispatch({
                type: 'SET_TAXA',
                payload: resp[0].taxa_entrega
            })

            dispatch({
                type: 'SET_WHATSAPP',
                payload: resp[0].whatsapp
            })

            dispatch({
                type: 'SET_PREVISAO',
                payload: resp[0].prazo_entrega
            })

            dispatch({
                type: 'SET_NOME',
                payload: resp[0].descricao
            })

        }
        carregaParametros()
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

        const r = await api.getVendas(token)
        setListaDePedidos(r)
        
    }


    return (
        <Conteiner>
            <Header search={headerSearch} onSearch={setHeaderSearch} title="Tela de Pedidos" whatSearch="Digite o CPF do cliente" />

            <OrderList>
                {
                    listaDePedidos.map((i, k) => {
                        return <OrderItem key={k} data={i} itemList={setModalActive} setCodCompra={setCodCompra} reloadList={reloadList} removeList={removeList} tipoEntrega={setTipoEntrega} />
                    })
                }
            </OrderList>

            <Modal active={modalActive} setActive={setModalActive}  >
                <ModalOrdem codOrdem={codCompra} tipoEngrega={tipoEntrega} />
            </Modal>

        </Conteiner>
    )
}

export default OrderScreen;