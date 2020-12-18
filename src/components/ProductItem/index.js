import React, { useState } from 'react'
import { Conteiner, ProductFotoArea, ProductInfoArea, ProductButtomArea, ProductFoto, ProductName, ProductPrice, ProductCodigo, ProductButtom } from './styled'
import Modal from '../../components/Modal'
import ModalProduct from '../../components/ModalProduct'

export default ({ data }) => {
    const [productVisible, setProductVisible] = useState(false);
    const [uri, setUri] = useState(data.path ? `https://approachmobile.company//files/${data.path}` : "https://approachmobile.company//files/e6a7faf6cc8c3e6da9e4726917cdc30e.png");

    const clickHandle = () => {
        setProductVisible(true)       
    }

    return (
        <Conteiner >
            <ProductFotoArea  onClick={() => clickHandle()}>
                <ProductFoto src={uri} />
            </ProductFotoArea>
            <ProductInfoArea>
                <ProductCodigo>Codigo Barras: {data.codigo_barras}</ProductCodigo>
                <ProductName>{data.nome}</ProductName>
                <ProductPrice>Preço: R$ {data.preco}</ProductPrice>
            </ProductInfoArea>
            <ProductButtomArea>
                <ProductButtom src="/assets/next.png" />
            </ProductButtomArea>
            <Modal active={productVisible} setActive={setProductVisible} >
                <ModalProduct idProduto={data.id} imgUrl={uri} nome={data.nome} setProductImage={setUri} setVisible={setProductVisible} className="modalBg" />
            </Modal>
        </Conteiner>
    )
}