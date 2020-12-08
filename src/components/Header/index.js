import React, { useState } from 'react';
import { useSelector } from 'react-redux'
import { Conteiner, Title, SearchInput, HeaderInfo, Text } from './styled'

function Header({ search, onSearch, title, whatSearch }) {
   const [inputActive, setInputActive] = useState(search === '' ? false : true);
   const name = useSelector(state => state.userReducer.name)

   const handleInputBlur = () => {
      if (search === '') {
         setInputActive(false);
      }
   }
   const handleInputFocus = () => {
      setInputActive(true);

   }

   const handleChange = (e) => {
      onSearch(e.target.value);
   }
   return (
      <Conteiner>
         <HeaderInfo>
            <Title>{title}</Title>
            <SearchInput
               type="Text"
               active={inputActive}
               placeholder={whatSearch}
               value={search}
               onChange={handleChange}
               onFocus={handleInputFocus}
               onBlur={handleInputBlur} />
         </HeaderInfo>
         <Text size="12px">Operador - {name}</Text>
      </Conteiner>
   )
}

export default Header;