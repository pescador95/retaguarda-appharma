import styled from 'styled-components'
import d from '../../config/padroes'

export const Container = styled.div`
   width:800px;
   height:600px;
   background-color:#eee
`
export const ItemArea = styled.div`
   display:grid;
   grid-template-columns: repeat(7, 10fr);
   padding:10px;
   border-bottom: 1px solid #999;
   margin-bottom: 5px;
`

export const ItemImage = styled.img``

export const CodigoBarras = styled.div`
font-size:14px;
color: ${props => props.color || '#000'} ;
padding-top:10px;
padding-left:10px;
cursor:pointer;
` 

export const Nome = styled.div`
font-size:14px;
color: ${props => props.color || '#000'} ;
padding-top:10px;
padding-left:10px;
`

export const PrecoUnidade = styled.div`
font-size:14px;
color: ${props => props.color || '#000'} ;
padding-top:10px;
padding-left:10px;
`

export const Qtd = styled.div`
font-size:14px;
color: ${props => props.color || '#000'} ;
padding-top:10px;
padding-left:10px;
`

export const Desconto = styled.div`
font-size:14px;
color: ${props => props.color || '#000'} ;
padding-top:10px;
padding-left:10px;
`

export const PrecoVigente = styled.div`
font-size:14px;
color: ${props => props.color || '#000'} ;
padding-top:10px;
padding-left:10px;
`

export const Total = styled.div`
font-size:14px;
color: ${props => props.color || '#000'} ;
padding-top:10px;
padding-left:10px;
`

export const Title = styled.div`
   font-size:18px;
   color: ${props => props.color || '#000'} ;
   padding-top:10px;
   padding-left:10px;
   margin-bottom:10px;
 
   font-weight: bold;
`