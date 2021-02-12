import styled from 'styled-components'

export const Conteiner = styled.div`
   display:flex;
   align-items:center;
   justify-content:center;
   background-color: ${props => props.ativo ? '#03fcf8' :  '#fff'};
   border:1px solid #ddd;
   padding:5px;
   margin-bottom:5px;
   margin-top:5px;
   tansition:all ease .4s;
   border-radius:5px;
   margin-left:5px;
   margin-right:5px;

   cursor:pointer;



   &:hover{
       background-color:#31f57f;
       border:1px solid #999;
   }

   `

export const Area = styled.div`

`

export const CategoriaIcone = styled.img`
    width:30px;
    height:30px;
   `

export const Label = styled.div`
    margin-left:5px;
    font-size:14px;
    flex:1;
`