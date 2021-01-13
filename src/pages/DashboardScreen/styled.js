import styled from 'styled-components'

export const Conteiner = styled.div`
   display:flex;
   align-items:center;
   justify-content:center;
   flex-direction:column;
   width:100%;
   `

export const Title = styled.div`
   height:50px;
   margin:10px;
   font-size:28px;
   font-weight:bold;
   text-align:center;
   width:95%;
`

export const GraficoArea = styled.div`
    display: grid;
    grid-template-columns: repeat(2, 1fr);
    grid-gap: 10px;
`

export const AreaLine = styled.div`
   margin:10px;
   padding:10px;
   width:800px;
   height:600px;
`

export const AreaBar = styled.div`
   margin:10px;
   padding:10px;
   width:800px;
   height:600px;
`