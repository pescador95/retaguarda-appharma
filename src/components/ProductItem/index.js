import React from 'react'
import {Conteiner, ProductFotoArea, ProductInfoArea, ProductButtomArea, ProductFoto, ProductName, ProductPrice, ProductCodigo, ProductButtom} from './styled'
import d from '../../config/padroes'

export default ({data}) => {
    return (
        <Conteiner>
            <ProductFotoArea>
                <ProductFoto src={d.URL_FILES+data.path} />
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