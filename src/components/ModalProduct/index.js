import React, { useState, useRef, useEffect } from 'react'
import { Container, ProductArea, ProductPhoto, ProductInfoArea, ProductDetails, ProductImportaFoto, ProductButtons, ProductName, ProductDescription, Buttom } from './styled'
import useApi from '../../Helpers/AppharmaApi'
import { useSelector } from 'react-redux'
import { SuccessMessage } from '../../AppStyled'
import env from "react-dotenv";

export default ({ idProduto, imgUrl, data, attProdutos, setActive }) => {

    const [image, setImage] = useState('');
    const [desc, setDesc] = useState('');
    const fileField = useRef();
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const token = useSelector(state => state.userReducer.token)
    const api = useApi()
    const [loading, setLoading] = useState(false);

    useEffect(()=>{
        setImage(imgUrl)

        if (data.descricao){
            setDesc(data.descricao)
        } else {
            setDesc('')
        }

        return () =>  {
            setImage("/assets/nopicture.png");
        }

    }, [imgUrl])

    const handleSubmit = async () => {

        if (loading){return}

        const fData = new FormData();
        let id_img = null;

        setLoading(true)

        if (fileField.current.files[0]) {
            console.log("Entrei para pegar a imagem")
            fData.append('file', fileField.current.files[0])
            let resposta = await api.sendPhoto(token, fData);
            console.log("Adicionei a imagme: "+ resposta.resp.data)
            let { url, imgId } = resposta.resp.data
            url = env.APP_URL+url;
            id_img = imgId
            setImage(url)
        }


        let obj;
        if(id_img!=null){
            obj = { id_produto: idProduto, descricao: desc, id_img: id_img }
        } else{
            obj = { id_produto: idProduto, descricao: desc}
        }

        console.log(JSON.stringify(obj))

        await api.putProduto(token, obj)
        setSuccess("Salvo com sucesso!")
        attProdutos();
        setTimeout(()=>{
            setSuccess('');
            setImage("/assets/nopicture.png");
            fileField.current.value = '';
            setLoading(false);
            setActive(false);


        },2000);

    }


    return (
        <Container>
            {success &&
                <SuccessMessage>{success}</SuccessMessage>
            }
            <ProductArea>
                <ProductPhoto src={typeof(image) === 'number' ? '/assets/nopicture.png' : image} />
                <ProductInfoArea>

                    <ProductDetails>
                        <ProductName>Nome: {data.nome}</ProductName>
                        <p>Descrição</p>
                        <ProductDescription cols="54" rows="10"
                            value={desc}
                            onChange={e => setDesc(e.target.value)}
                        ></ProductDescription>
                        <ProductImportaFoto type="file" ref={fileField} />
                    </ProductDetails>

                </ProductInfoArea>
            </ProductArea>
            <ProductButtons> 
                <Buttom active={!loading} onClick={() => handleSubmit()}>Salvar</Buttom>
            </ProductButtons>
        </Container>
    )
}