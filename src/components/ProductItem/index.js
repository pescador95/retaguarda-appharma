import React, {useState, useEffect} from 'react'
import {Conteiner, ProductFotoArea, ProductInfoArea, ProductButtomArea, ProductFoto, ProductName, ProductPrice, ProductCodigo, ProductButtom} from './styled'
import d from '../../config/padroes'

export default ({data, selected, setVisible, setProductImage, setProductName}) => {
    const[uri, setUri] = useState( data.path ? `https://approachmobile.company//files/${data.path}` : "https://approachmobile.company//files/e6a7faf6cc8c3e6da9e4726917cdc30e.png");
    const clickHandle =  () => {
        selected(data.id)
        setProductImage(uri)
        console.log("Setei uri: "+uri)
        setProductName(data.nome)
        setVisible(true)
    }

    return (
        <Conteiner onClick={() => clickHandle()}>
            <ProductFotoArea>
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
        </Conteiner>
    )
}