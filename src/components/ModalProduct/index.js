import React, {useState, useRef} from 'react'
import {Container, ProductArea, ProductPhoto, ProductInfoArea, ProductDetails, ProductImportaFoto, ProductButtons, ProductName, ProductDescription, Buttom} from './styled'
import useApi from '../../Helpers/AppharmaApi'
import { useSelector } from 'react-redux'

export default ({idProduto}) =>{
    
    const[desc, setDesc] = useState('');
    const[uri, setUri] = useState("https://approachmobile.company//files/8d390e0e49b62374aba34c7dbc717f37.jpg");
    const fileField = useRef();
    const [error, setError] = useState('');
    const token = useSelector(state => state.userReducer.token)
    const api = useApi()
    

    const handleSubmit = async(e) => {
        const fData = new FormData();
        
        if(fileField.current){
            fData.append('file', fileField.current.files[0])
        }
        
        let resposta = await api.sendPhoto(token, fData);
        
        let {url, id} =  resposta.resp.data.imgId
        
        setUri(url)
        
        let obj = {id_produto: idProduto, descricao:desc, id_img: id}
        
        await api.putProduto(token, obj )
        

    }

    return (
        <Container>
            <ProductArea>
                <ProductPhoto src ={uri} />
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