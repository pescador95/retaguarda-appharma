import React, { useState } from 'react'
import { Conteiner, ProductFotoArea, ProductInfoArea, ProductButtomArea, ProductFoto, ProductName, ProductPrice, ProductCodigo, ProductButtom, AreaAux } from './styled'
import Modal from '../../components/Modal'
import ModalProduct from '../../components/ModalProduct'

export default ({ data, getProdutos }) => {
    const [productVisible, setProductVisible] = useState(false);
    const [uri, setUri] = useState();

    const clickHandle = () => {
        setProductVisible(true)       
    }

    return (
        <Conteiner  >
            <AreaAux onClick={() => clickHandle()}>
            <ProductFotoArea >
                <ProductFoto src={data.path ? `https://approachmobile.company//files/${data.path}` : "/assets/nopicture.png"} />
            </ProductFotoArea>
            <ProductInfoArea>
                <ProductCodigo>Codigo Barras: {data.codigo_barras}</ProductCodigo>
                <ProductName>{data.nome}</ProductName>
                <ProductPrice>Preço: R$ {data.preco}</ProductPrice>
            </ProductInfoArea>
            <ProductButtomArea>
                <ProductButtom src="/assets/next.png" />
            </ProductButtomArea>
            </AreaAux>
            <Modal active={productVisible} setActive={setProductVisible} >
                <ModalProduct idProduto={data.id} 
                                      imgUrl={data.path ? `https://approachmobile.company//files/${data.path}` : "/assets/nopicture.png"} 
                                      data={data} 
                                    attProdutos={getProdutos}
                                      />
            </Modal>
        </Conteiner>
    )
}