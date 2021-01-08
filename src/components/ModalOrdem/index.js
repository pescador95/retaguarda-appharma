import React, { useEffect, useState } from 'react';

import { CopyToClipboard } from 'react-copy-to-clipboard';
import { useSelector } from 'react-redux'
import useApi from '../../Helpers/AppharmaApi'
import { Container, ItemArea, CodigoBarras, Nome, PrecoUnidade, Qtd, Desconto, PrecoVigente, Total, Title } from './styled'



function ModalOrdem({ codOrdem, tipoEngrega }) {
    const api = useApi()
    const token = useSelector(state => state.userReducer.token)
    const taxa_engrega = useSelector(state => state.shopReducer.taxa_engrega)
    const [listaItems, setListaItems] = useState([])
    const [codigoBar, setCodigoBar] = useState('')
    const [delivery, setDelivery] = useState('')
    let totalGeral = 0;
    if (delivery) {
        totalGeral = parseFloat(taxa_engrega)
    }

    useEffect(()=>{
        if(tipoEngrega=='Delivery'){
            setDelivery(true)
        } else {
            setDelivery(false)
        }
    }, [tipoEngrega])

    useEffect(() => {
        const getItemList = async () => {
            const lista = await api.getItemsOrder(token, codOrdem);
            setListaItems(lista)
        }
        getItemList()


        return () => {
            setListaItems([])
        }
    }, [codOrdem])

    const handleCodClick = (e) => {
        setCodigoBar(e)
    }


    return (
        <Container id="itemArea"  >

            <Title>Lista de itens do pedido:</Title>
            <ItemArea id="">
                <CodigoBarras>Cod. de Barras</CodigoBarras>
                <Nome>Nome</Nome>
                <PrecoUnidade>Preço Real</PrecoUnidade>
                <Qtd>Quantidade</Qtd>
                <Desconto>Desconto</Desconto>
                <PrecoVigente>Preço</PrecoVigente>
                <Total>Total Itens</Total>
            </ItemArea>
            { listaItems.map((i, k) => {
                totalGeral += i.valor_liquido * i.qtditens;

                return (
                    <ItemArea key={k} id="imprimir">

                        <CopyToClipboard text={codigoBar} >
                            <CodigoBarras color='#136713' onClick={() => handleCodClick(i.codigo_barras)}>{i.codigo_barras}</CodigoBarras>
                        </CopyToClipboard>

                        <Nome color='#136713'>{i.nome}</Nome>
                        <PrecoUnidade color='#136713'>R$ {parseFloat(i.valor_original).toFixed(2).replace('.', ',')}</PrecoUnidade>
                        <Qtd color='#136713'>{i.qtditens}</Qtd>
                        <Desconto color='#00f'>{parseFloat(i.percent).toFixed(2)} %</Desconto>
                        <PrecoVigente color='#136713'> R$ {parseFloat(i.valor_liquido).toFixed(2).replace('.', ',')}</PrecoVigente>
                        <Total color='#136713'>R$ {parseFloat(i.valor_liquido * i.qtditens).toFixed(2).replace('.', ',')}</Total>
                    </ItemArea>)
            })}
            {delivery &&
                <ItemArea id="imprimir">
                    <CopyToClipboard  >
                        <CodigoBarras color='#136713'></CodigoBarras>
                    </CopyToClipboard>
                    <Nome color='#136713'>Taxa entrega:</Nome>
                    <PrecoUnidade color='#136713'></PrecoUnidade>
                    <Qtd color='#136713'></Qtd>
                    <Desconto color='#00f'></Desconto>
                    <PrecoVigente color='#136713'> </PrecoVigente>
                    <Total color='#136713'>R$ {parseFloat(taxa_engrega).toFixed(2).replace('.', ',')}</Total>
                </ItemArea>
            }
            <ItemArea id="imprimir">

                <CopyToClipboard  >
                    <CodigoBarras color='#136713'>Total:</CodigoBarras>
                </CopyToClipboard>

                <Nome color='#136713'></Nome>
                <PrecoUnidade color='#136713'></PrecoUnidade>
                <Qtd color='#136713'></Qtd>
                <Desconto color='#00f'></Desconto>
                <PrecoVigente color='#136713'> </PrecoVigente>
                <Total color='#136713'>R$ {parseFloat(totalGeral).toFixed(2).replace('.', ',')}</Total>
            </ItemArea>
        </Container>
    )
}

export default ModalOrdem;