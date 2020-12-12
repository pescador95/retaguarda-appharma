import React, {useState} from 'react';

import { LoginArea, Title, Conteiner } from './styled'
import useApi from '../../Helpers/AppharmaApi'
import {doLogin} from '../../Helpers/AuthHandler'
import {ErrorMessage} from  '../../AppStyled'
import { useDispatch } from 'react-redux'

function Login() {
   const api = useApi();
   const dispatch = useDispatch();
   const [cpf, setCpf] = useState('');
   const [password, setPassword] = useState('');
   const [disable, setDisable] = useState(false);
   const [error, setError] = useState('');

   const handleSubmit = async (e) =>{
      e.preventDefault();
  //    setDisable(true);

      const r = await api.login(cpf, password);

      if (r.error){
         setError(r.error);
         setDisable(false);
         return;
      } else {
         let token = r.token
         let name = r.session.name
         doLogin(token);
         dispatch({ type: "SET_TOKEN", payload: {token} });
         dispatch({ type: "SET_NAME", payload: {name}})
         window.location.href = '/';
      }

   }
   return (
      <Conteiner>
      <Title>Login - CI TESTE</Title>
      <LoginArea>
         {error &&
            <ErrorMessage>{error}</ErrorMessage>
         }
         <form onSubmit={handleSubmit}>
            <label className="area">
               <div className="area--title">CPF:</div>
               <div className="area--input">
                  <input type="text"  disabled={disable}  value={cpf} required onChange={e => setCpf(e.target.value)}/>
               </div>
            </label>
            <label className="area">
               <div className="area--title">Senha:</div>
               <div className="area--input" >
                  <input type="password" disabled={disable} value={password} required onChange={e => setPassword(e.target.value)}/>
               </div>
            </label>
            <label className="area">
               <div className="area--title"></div>
               <div className="area--input">
                  <button disabled={disable} >Fazer Login</button> 
               </div>
            </label>
         </form>
      </LoginArea>
      </Conteiner>
   )
}

export default Login;