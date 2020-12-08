import styled from 'styled-components'

export const Conteiner = styled.div`
   background-color: #136713;
   border-radius:5px;
   padding: 20px;

   
`

export const HeaderInfo = styled.div`
   display:flex;
   flex-direction:row;
   justify-content:space-between;
   
`

export const Text = styled.div`
display:flex;
font-size:${props => props.size || '12px'};
width:100%;
color:#fff;
text-align:center;
justify-content:center;
align-items:center;

`

export const Title = styled.div`
   display:flex;
   font-size:${props => props.size || '26px'};
   width:100%;
   color:#fff;
   font-weight:bold;
   text-align:center;
   justify-content:center;
   align-items:center;
`
export const SearchInput = styled.input`
   margin:10px;
   border:0;
   border-radius:25px;
   width: ${props => props.active ? '300px' : '0px'} ;
   height: 50px;
   background-color:#fff;
   outline:0;
   align-items:center;
   background-image: url('/assets/search.png');
   background-size: 30px;
   background-repeat: no-repeat;
   background-position: 10px center;
   padding-left: 50px;
   transition: all ease .2s;
   cursor: pointer;
   font-size:15px;

   &:focus{
      cursor: text;
   }
`
