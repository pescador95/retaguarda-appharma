import React from 'react';

import { Container, ModalBody } from './styled';



function Modal({active, setActive, children}) {

   const handleClick = (e) => {
      if(e.target.classList.contains('modalBg')){
         setActive(false)
      }
   }


   return (
     <Container active={active} setActive={setActive} onClick={handleClick} className="modalBg">
        <ModalBody>
            {children}
        </ModalBody>
     </Container>
  )
}

export default Modal;