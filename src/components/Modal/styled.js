import styled from 'styled-components'

export const Container = styled.div`
   display: ${props => props.active ? 'flex' : 'none'};
   position: fixed;
   left:0;
   top:0;
   bottom:0;
   right: 0;
   background-color: rgba(0, 0, 0, 0.7);
   justify-content:center;
   align-items:center;

`

export const ModalBody = styled.div`
   background-color: #fff;
   border-radius:5px;
   box-shadow: 0px 0px 30px #000;
   max-height:95vh;
   max-width:100vw;
   overflow:auto;
`