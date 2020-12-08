import styled from 'styled-components'

export const Conteiner = styled.div`
   display: flex;
   height:100vh;

   background-color:#999;
   font-family: 'Roboto', sans-serif;

`
export const PageBody = styled.div`
   display:flex;
   flex:1;
   background-color:#eee;
   overflow-y:auto;
`
export const Menu = styled.div`
   display: flex;
   flex-direction:column;
   align-items:center;
   justify-content:center;
   background-color: #136713;
   width:80px;
`

export const ErrorMessage = styled.div`
   margin:10px 0px;
   padding:5px;
   background-color: #ffcaca;
   border: 2px solid #ff0000;
   color:#ff0000;
`

export const SuccessMessage = styled.div`
   margin:10px 0px;
   padding:5px;
   background-color:rgba(42, 212, 87, 0.7);
   border: 2px solid #00d438;
   color:#005216;
`