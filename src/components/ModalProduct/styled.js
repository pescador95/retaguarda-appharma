import styled from 'styled-components'

export const Container = styled.div`
    width: 800px;
    padding:10px;
    background-color:#eee

`

export const ProductArea = styled.div`
    display:flex;
    height: 350px;
    
    `
export const ProductButtons = styled.div`
        display:flex;
        justify-content:center;
        align-items:center;
        height:50px;
    `
export const ProductPhoto = styled.img`
    width:310px;
`

export const ProductInfoArea = styled.div`
    flex:1;
    padding:5px;
`
export const ProductDetails = styled.form`
    flex-direction:column;
    padding:5px;
    height:100%;
`
export const ProductImportaFoto = styled.input`
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

export const ProductDescription = styled.textarea`
    margin:5px;
    resize: none;
`

export const ProductName = styled.div`
    font-size:16px;
`

export const Buttom = styled.button`
    width:100px;
      background-color: ${props => props.active ? '#0089ff' : '#999'};
      border:1;
      outline:0;
      padding:5px 10px;
      cursor:pointer;
      font-size:12px;
      color:${props => props.active ? '#fff' : '#fff'};;
      border-radius:5px;
      margin-left:5px;
         
      &:hover {      
         background-color: ${props => props.active ? '#006fce' : '#999'};
      }
`