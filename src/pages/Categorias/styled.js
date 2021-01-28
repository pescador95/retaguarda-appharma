import styled from 'styled-components'

export const Conteiner = styled.div`
   display:flex;
   flex:1;
   align-items:center;
   justify-content:center;
   flex-direction:column`

   export const Title = styled.div`
   margin:10px;
   font-size:24px;
   font-weight:bold;
   color:#106e36;
`

export const Label = styled.div`
   margin:5px;
   padding:5px;
   font-size:14px;
   text-align:center;
   font-weight:bold;
   color: ${props => props.color || '#106e36'} ;
`

export const Buttom = styled.button`
      background-color: ${props => props.active ? '#0089ff' : '#999'};
      border:1;
      outline:0;
      padding:5px 10px;
      cursor:pointer;
      font-size:12px;
      color:${props => props.active ? '#fff' : '#fff'};;
      border-radius:5px;
      
      &:hover {      
         background-color: ${props => props.active ? '#006fce' : '#999'};
      }
`

export const Input = styled.input`
   margin:5px;
   padding:2px;
   border:0;
   border-radius:5px;
   width: 300px;
   height: 25px;
   background-color:#fff;
   outline:1;
   align-items:center;
   cursor: pointer;
   font-size:15px;

   &:focus{
      cursor: text;
   }
`

export const CategoriaArea = styled.div`
   display:flex; 
   flex-direction:row;
   align-items:center;
`
export const SubCategoriaArea = styled.div`
   display:flex; 
   flex-direction:row;
   height:75px;
   align-items:center;
   justify-content:center;
   margin-bottom:10px;
`

export const Body = styled.div`
   margin-top:10px;
   margin-bottom:10px;
   display:flex;
   flex:1;
   flex-direction:column;
   width:95%;
`

export const ButtomArea = styled.div`
   width:100px;
   display:flex;
   margin-left:20px;
   justify-content:center;
   align-items:center;
`

export const IconeArea = styled.div`
   margin:5px;
   display:flex;
   flex-direction:row;
   justify-content:center;
   align-items:center;
`

export const ImportaIconeCategoria = styled.input`
width:100%;
font-size:14px;
padding:5px;
border:1px solid #eee
background-color:#fff;
margin:5px;
outline:0;
tansition:all ease .4s;
&:focus{
    border:1px solid #333;
    color:#333;
}
`
export const CategoriaList = styled.div`
   ` 

   export const SubCategoriaList = styled.div`
   display: grid;
   grid-template-columns: repeat(6, 1fr);
   grid-gap: 10px;
   ` 

export const CategoriaListArea = styled.div`
   height:210px;
   overflow:auto;
` 

export const SubCategoriaListArea = styled.div`
    margin-top:20px;
    height:235px;
    border-radius:10px;
   background-color:#106e36;
   overflow:auto;
` 
