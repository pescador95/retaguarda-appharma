import styled from 'styled-components'

export const LinkArea = styled.a`
   display: flex;
   justify-content:center;
   align-items:center;
   width:50px;
   height:50px;
   background-color: ${props => props.active ? '#0b4d0b' : 'transparent' };
   border-radius:8px;
   margin: 5px 5px;
`;

export const LinkIcon = styled.img`
width:30px;
height:auto;
`;