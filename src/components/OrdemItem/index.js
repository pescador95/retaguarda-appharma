import React, { useState, useEffect } from 'react';

import { useSelector } from 'react-redux'
import FormataCpf from '../../Helpers/FormataCpf'
import Titlelize from '../../Helpers/Titlelize'
import {
    Container, BodyItem, InfoOrder, StatusArea, Buttom, PedidoInfo, ChavePedido, Text, HeaderStatus, WhatsArea,
    ButtonsStatus, InfoOrderArea, EnderecoArea, Endereco, EnderecoHeader, CancelButtom, CancelArea, WhatsappButtom, OptionsArea, AreaBotoes
} from './styled';
import useApi from '../../Helpers/AppharmaApi'
import { ErrorMessage, SuccessMessage } from '../../AppStyled'


function OrdemItem({ data, itemList, setCodCompra, reloadList, removeList, tipoEntrega }) {
    const [errorMsg, setErrorMsg] = useState('')
    const [successMsg, setSuccessMsg] = useState('')
    const [openEndereco, setOpenEndereco] = useState(false)
    const api = useApi()
    const token = useSelector(state => state.userReducer.token)
    const nomeUsuario = useSelector(state => state.userReducer.name)
    const dataVenda = new Date(data.data_venda).toLocaleDateString('pt-Br')
    const horaVenda = new Date(data.data_venda).toLocaleTimeString('pt-BR')


    useEffect(() => {
        if (errorMsg === '' && successMsg === "") { return }

        setTimeout(() => {
            setErrorMsg('')
            setSuccessMsg('')
        }, 2000)

    }, [errorMsg, successMsg])


    const handleItemClick = (e) => {
        if (!e.target.classList.contains('buttom')) {
            setCodCompra(data.codigo_venda)
            tipoEntrega(data.tipo_entrega)
            itemList(true)
        }

    }

    const handleAutorizado = async (idCliente) => {
        if (data.status !== 'Pendente') {
            setErrorMsg('Você já autorizou esse pedido!')
            return
        }

        try {
            await api.changeStatus(token, 'Confirmado', data.codigo_venda, nomeUsuario)
            await api.sendMessage(token, 1, idCliente, data.codigo_venda)
            setSuccessMsg('Venda autorizada com sucesso!')
            reloadList()
            await api.baixarReservas(token, data.codigo_venda)
        } catch (e) {
            setErrorMsg('Erro ao autorizar esse pedido! ' + e.message)
            return
        }

    }



    const handleSaiu = async (idCliente) => {
        if (data.status !== 'Confirmado') {
            setErrorMsg('Você precisa autorizar o pedido primeiro!')
            return
        }

        try {
            await api.changeStatus(token, 'Enviado', data.codigo_venda, nomeUsuario)
            await api.sendMessage(token, 2, idCliente, data.codigo_venda)
            setSuccessMsg('Venda enviada ao cliente com sucesso!')
            reloadList()
        } catch (e) {
            setErrorMsg('Erro ao enviar esse pedido! ' + e.message)
            return
        }
    }

    const handleEntregue = async (idCliente) => {
        if (data.status !== 'Enviado') {
            setErrorMsg('Você precisa autorizar e enviar o pedido primeiro!')
            return
        }

        try {
            await api.changeStatus(token, 'Finalizado', data.codigo_venda, nomeUsuario)
            await api.sendMessage(token, 3, idCliente, data.codigo_venda)
            setSuccessMsg('Venda finalizada com sucesso!')
            removeList(data.codigo_venda)

        } catch (e) {
            setErrorMsg('Erro ao finalizar esse pedido! ' + e.message)
            return
        }

    }

    const handleAbreWhats = (uatis) => {
        let whats = handleWhats(uatis)
        let link = `https://api.whatsapp.com/send?phone=+55${whats.replace(/[^0-9]+/g, "")}&text=Oi estou verificando seu pedido.`
        window.open(link, "_blank");

    }

    const handleWhats = (uatis) => {
        let v = uatis;
        var r = v.replace(/\D/g, "");
        r = r.replace(/^0/, "");
        if (r.length > 10) {
            r = r.replace(/^(\d\d)(\d{5})(\d{4}).*/, "($1) $2-$3");
        } else if (r.length > 5) {
            r = r.replace(/^(\d\d)(\d{4})(\d{0,4}).*/, "($1) $2-$3");
        } else if (r.length > 2) {
            r = r.replace(/^(\d\d)(\d{0,5})/, "($1) $2");
        } else {
            r = r.replace(/^(\d*)/, "($1");
        }
        return r

    }

    const handleEndereco = () => {
        setOpenEndereco(!openEndereco)
    }

    const handleCancelar = async (idCliente) => {

        try {
            await api.changeStatus(token, 'Cancelado', data.codigo_venda, nomeUsuario)
            await api.sendMessage(token, 4, idCliente, data.codigo_venda)
            await api.cancelarResarvas(token, data.codigo_venda)
            setSuccessMsg('Venda cancelada com sucesso!')
            removeList(data.codigo_venda)

        } catch (e) {
            setErrorMsg('Erro ao cancelar esse pedido! ' + e.message)
            return
        }

    }



    return (
        <Container onClick={handleItemClick}>
            {errorMsg && <ErrorMessage><Text>{errorMsg}</Text></ErrorMessage>}
            {successMsg && <SuccessMessage><Text>{successMsg}</Text></SuccessMessage>}
            <Text size="14px" style={{ textAlign: 'center', marginBottom: 5 }}> Data da Venda: {dataVenda} {horaVenda}</Text>
            <BodyItem className="item">
                <PedidoInfo>
                    <Text>CPF: </Text>
                    <Text>Nome</Text>
                    <Text>Celular</Text>
                    <Text>Tipo Entrega</Text>
                    <Text>{data.tipo_entrega === 'Delivery' ? 'Levar Pinpad?' : 'Total'}</Text>
                    <Text>{data.tipo_entrega === 'Delivery' ? 'Troco para' : ' '}</Text>
                    <Text>{data.tipo_entrega === 'Delivery' ? 'Total' : ' '}</Text>
                    <Text size="13px" >{FormataCpf(data.cpf)}</Text>
                    <Text size="13px">{data.name}</Text>
                    <Text size="13px">{handleWhats(data.whatsapp)}</Text>
                    <Text size="13px">{data.tipo_entrega}</Text>
                    {data.tipo_entrega === 'Delivery' &&
                        <Text size="13px">{data.levar_pinpad ? 'Sim' : 'Não'}</Text>
                    }
                    {data.tipo_entrega === 'Delivery' && data.troco_para &&
                        <Text size="13px">R$ {parseFloat(data.troco_para).toFixed(2).replace('.', ',')} </Text>
                    }
                    <Text size="13px">R$ {parseFloat(data.total).toFixed(2).replace('.', ',')}</Text>
                </PedidoInfo>
                <StatusArea>
                    <HeaderStatus>
                        <Text>Status - [ {data.status == 'Confirmado' ? 'Autorizado' : data.status} ] </Text>
                    </HeaderStatus>
                    <ButtonsStatus>
                        <Buttom active={data.status == 'Pendente' ? true : false} className="buttom" onClick={() => {
                            handleAutorizado(data.idcliente)
                        }}>Autorizado</Buttom>
                        <Buttom active={data.status == 'Confirmado' ? true : false} className="buttom" onClick={() => {
                            handleSaiu(data.idcliente)
                        }}>Saiu Entrega</Buttom>
                        <Buttom active={data.status == 'Enviado' ? true : false} className="buttom" onClick={() => {
                            handleEntregue(data.idcliente)
                        }}>Entregue</Buttom>
                    </ButtonsStatus>
                    <CancelArea>
                        <CancelButtom active={true} className="buttom" onClick={() => {
                            handleCancelar(data.idcliente)
                        }}>Cancelar</CancelButtom>
                    </CancelArea>
                    <WhatsArea>
                        <WhatsappButtom active={true} className="buttom" onClick={() => handleAbreWhats(data.whatsapp)}>Whatsapp</WhatsappButtom>
                    </WhatsArea>
                </StatusArea>
            </BodyItem>
            <InfoOrder className="buttom" open={openEndereco}>
                {data.tipo_entrega === 'Delivery' && <EnderecoArea onClick={handleEndereco}>
                    <EnderecoHeader>
                        <img className="buttom" src='/assets/address.png' style={{ width: 20, height: 20, borderRadius: 10 }} />
                        <Text className="buttom" size="14px"> Ver Endereço </Text>
                    </EnderecoHeader>
                    <Endereco open={openEndereco}>
                        <Text>{data.rua}, número {data.numero}  {data.complemento ? "complemento " + data.complemento : ''}</Text>
                        <Text>Bairro {data.bairro}  - CEP {data.cep}</Text>
                    </Endereco>
                </EnderecoArea>}
                <InfoOrderArea open={openEndereco} >
                    <p className="buttom" style={{ fontSize: 13, marginRight: 5 }}>
                        Chave Pedido:
               </p>
                    <ChavePedido className="buttom" >{data.codigo_venda}</ChavePedido>
                </InfoOrderArea>
            </InfoOrder>
        </Container>
    )
}

export default OrdemItem;