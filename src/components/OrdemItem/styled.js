import styled from 'styled-components'

export const Container = styled.div`
   display:flex;
   flex-direction:column;
   background-color:#bbfcc9;
   border:1px solid #999;
   margin-bottom:10px;
   padding:10px;
   box-shadow:0px 0px 5px #999;
   border-radius:5px;
`

export const BodyItem = styled.div`
   display:flex;
   flex:1;
   flex-direction:row;
   height:35px;
`

export const InfoOrder = styled.div`
   display:flex;
   flex-direction:column;
   height:${props => props.open ? '120px' : '60px'};
   justify-content:center;
   align-items:center;
   transition: all ease .2s;
`
export const ChavePedido = styled.div`
   font-size:12px;
`
export const StatusArea = styled.div`
  display:flex;
  flex-direction:column;
  margin-left:5px;
  height:125px;

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


export const CancelButtom = styled.button`
      background-color: ${props => props.active ? '#FF0000' : '#999'};
      flex:1;
      border:1;
      outline:0;
      padding:5px 10px;
      cursor:pointer;
      font-size:12px;
      font-weight:bold;
      color: #eee;
      border-radius:5px;
      &:hover {      
         background-color: ${props => props.active ? '#cf6b15' : '#999'};
      }
`
export const WhatsappButtom = styled.button`
      background-color: ${props => props.active ? '#128c7e' : '#999'};
      flex:1;
      border:1;
      outline:0;
      padding:5px 10px;
      cursor:pointer;
      font-size:12px;
      font-weight:bold;
      color: #eee;
      border-radius:5px;
      &:hover {      
         background-color: ${props => props.active ? '#25d366' : '#999'};
      }
`
export const HeaderStatus = styled.div`
   display:flex;
   margin:5px;
   justify-content:center;
   align-items:center;

` 

export const ButtonsStatus = styled.div`
   display:flex;
`

export const OptionsArea = styled.div`
 
`
export const AreaBotoes = styled.div`
      background-color:#000;
      height:150px
`

export const CancelArea = styled.div`
      display:flex;
      margin-top:5px;
`
export const WhatsArea = styled.div`
      display:flex;
      margin-top:5px;
`
export const PedidoInfo = styled.div`
   display:grid;
   width:100%;
   height:50px;
   grid-template-columns: repeat(7, 2fr);
   border-bottom:1px solid #999;
   border-top:1px solid #999;
   padding-top:10px;
   cursor:pointer;
`

export const Text = styled.div`
   font-size: ${props => props.size || '14px'};
   font-weight: ${props => props.weight || 'normal'}
`

export const InfoOrderArea = styled.div`
      display:flex;
      flex-direction:row;
      align-items:center;      
      border-top:${props => props.open ? '1px solid #999' : '0px'};
      transition: all ease .2s;
`

export const EnderecoArea = styled.div`
   display:flex;
   flex:1;
   flex-direction:column;
`
export const Endereco = styled.div`
    display: ${props => props.open ? 'flex' : 'none'} ;
    flex-direction: column;
    flex:1;
    margin:10px 5px;
`
export const EnderecoHeader = styled.div`
display:flex;
flex-direction:row;
margin-top:10px;
margin-bottom:5px;
justify-content:center;

img, div{
   cursor:pointer;
}

`