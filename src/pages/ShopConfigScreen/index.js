import React, { useState } from 'react';
import { useHistory } from "react-router-dom";
import { Container, Titulo } from './styled';
import Header from '../../components/Header'
import { useSelector } from 'react-redux'
 
export default () => {
   const history = useHistory();
   const token = useSelector(state => state.userReducer.token);
   const [headerSearch, setHeaderSearch] = useState('');
   return (
      <Container>
         <Header search={headerSearch} onSearch={setHeaderSearch} title="Configurações da Loja" whatSearch="Digite o nome do produto"/>
        

      </Container>
   );
}