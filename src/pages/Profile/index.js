import React from 'react';

import { Conteiner, ButtomArea, SingOut, BodyArea } from './styled';
import { useDispatch } from 'react-redux'
import { useHistory } from 'react-router-dom'
import SelecionaSubcategoiras from '../../components/SelecionaSubcategorias'

function Profile() {
   const dispatch = useDispatch();
   const history = useHistory()

   const handleClick = () => {
      dispatch({
         type: 'CLEAR_AUTH'
      })
      history.push('/')
   }
   return (
      <Conteiner>
          <SelecionaSubcategoiras id_produto="2" />
         {/* <BodyArea>
            <ButtomArea onClick={handleClick}>
               <SingOut>Logout</SingOut>
            </ButtomArea>
         </BodyArea> */}
      </Conteiner>
   )
}

export default Profile;