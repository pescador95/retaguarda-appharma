import React from 'react';

import { Container, InfoArea, QtdArea, ValorArea } from './styled'

function ItemPedido() {
  return (
     <Container>
        <InfoArea>
           <p>Codigo de barras: xxxxxxxxxx</p>
           <p>Nome: Supositorios para vaginas</p>
        </InfoArea>
        <QtdArea>
            Qtd: 10
        </QtdArea>
        <ValorArea>
            Valor: R$ 10,00
        </ValorArea>
     </Container>
  )
}

export default ItemPedido;