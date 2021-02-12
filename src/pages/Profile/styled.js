import styled from 'styled-components'

export const Conteiner = styled.div`
display:flex;
flex:1;
align-items:center;
justify-content:center;
flex-direction:column
`

export const BodyArea = styled.div`
width: 400px;
height: 300px;
background-color:#fff;
display: flex;
justify-content: center;
align-items: center;

`

export const ButtomArea = styled.div`
padding: 10px;
box-shadow: 0px 0px 3px #999;
background-color:#ddd;
cursor: pointer;

&: hover{
    background-color:#eee;
}

`

export const SingOut = styled.div``