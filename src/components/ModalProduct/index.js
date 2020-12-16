import React, {useState, useRef} from 'react'
import {Container, ProductArea, ProductPhoto, ProductInfoArea, ProductDetails, ProductImportaFoto, ProductButtons, ProductName, ProductDescription, Buttom} from './styled'
import useApi from '../../Helpers/AppharmaApi'
import { useSelector } from 'react-redux'

export default () =>{
    const[desc, setDesc] = useState('');
    const fileField = useRef();
    const [error, setError] = useState('');
    const token = useSelector(state => state.userReducer.token)
    const api = useApi()

    const handleSubmit = async(e) => {
        const fData = new FormData();

        if(fileField.current.files.lengh > 0){
            fData.append('file', fileField.current.files[0])
        }

        let resposta = await api.sendPhoto(token, fData);

        console.log(resposta)

    }

    return (
        <Container>
            <ProductArea>
                <ProductPhoto src ="https://approachmobile.company/files/ce7038a79012d43faa7ef8bde2648394.jpg" />
                <ProductInfoArea>

                    <ProductDetails>
                        <ProductName>Nome: Fuking Produto</ProductName>
                        <p>Descrição</p>
                        <ProductDescription cols="45" rows="10" 
                            value={desc}
                            onChange={e=>setDesc(e.target.value)}
                        ></ProductDescription>
                        <ProductImportaFoto type="file" ref={fileField}/>
                    </ProductDetails>
 
                </ProductInfoArea>
            </ProductArea>
            <ProductButtons>
                    <Buttom active={true} onClick={()=>handleSubmit()}>Salvar</Buttom>

            </ProductButtons>
        </Container>
    )
}