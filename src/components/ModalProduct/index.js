import React, { useState, useRef, useEffect } from 'react'
import { Container, ProductArea, ProductPhoto, ProductInfoArea, AreaFotoDesc, ProductDetails, ProductImportaFoto, ProductButtons, ProductName, ProductDescription } from './styled'
import useApi from '../../Helpers/AppharmaApi'
import Button from '@material-ui/core/Button';
import SelecionaSubcategoiras from '../../components/SelecionaSubcategorias'
import { useSelector } from 'react-redux'
import { SuccessMessage, ErrorMessage } from '../../AppStyled'
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

    useEffect(() => {

        if (error != ''){
            setTimeout(()=>{
                setError('');
                setLoading(false)
            }, 2000)
        }

    }, [error])

    useEffect(() => {
        setImage(imgUrl)

        if (data.descricao) {
            setDesc(data.descricao)
        } else {
            setDesc('')
        }

        return () => {
            setImage("/assets/nopicture.png");
        }

    }, [imgUrl])


  


    const handleSubmit = async () => {

        if (loading) { return }

        const fData = new FormData();
        let id_img = null;

        setLoading(true)

        if (fileField.current.files[0]) {

            if( parseInt(data.classe_terapeutica) > 0){
                setError('Não é possivel alterar foto de produtos com classe terapeutica!');
                return
            }

            console.log("Entrei para pegar a imagem")
            fData.append('file', fileField.current.files[0])
            let resposta = await api.sendPhoto(token, fData);
            console.log("Adicionei a imagme: " + resposta.resp.data)
            let { url, imgId } = resposta.resp.data
            url = env.APP_URL + url;
            id_img = imgId
            setImage(url)
        }


        let obj;
        if (id_img != null) {
            obj = { id_produto: idProduto, descricao: desc, id_img: id_img }
        } else {
            obj = { id_produto: idProduto, descricao: desc }
        }

        console.log(JSON.stringify(obj))

        await api.putProduto(token, obj)
        setSuccess("Salvo com sucesso!")
        attProdutos();
        setTimeout(() => {
            setSuccess('');
           // setImage("/assets/nopicture.png");
            fileField.current.value = '';
            setLoading(false);
            setActive(false);


        }, 2000);

    }


    return (
        <Container>
            {success &&
                <SuccessMessage>{success}</SuccessMessage>

            }
            {error &&
                <ErrorMessage>{error}</ErrorMessage>

            }
            <ProductArea style={{ zIndex: -10 }}>
                <AreaFotoDesc>
                    <div style={{ display: 'flex', flexDirection: 'column', justifyContent: 'center', alignItems: 'center' }}>
                        <ProductPhoto src={typeof (image) === 'number' ? '/assets/nopicture.png' : image} />
                        <ProductImportaFoto type="file" ref={fileField} />
                    </div>
                    <ProductInfoArea>

                        <ProductDetails>
                            <div style={{ background: '#eee', width: 450, margin: 3, padding: 5, borderRadius: 10 }}>
                                <ProductName style={{ fontWeight: 'bold' }}>Nome: </ProductName>
                                <ProductName>{data.nome}</ProductName>

                            </div>
                            <p>Descrição</p>
                            <ProductDescription cols="54" rows="10"
                                value={desc}
                                onChange={e => setDesc(e.target.value)}
                            ></ProductDescription>
                            <ProductButtons>
                                {!loading &&
                                    <Button variant="contained" onClick={() => handleSubmit()} color="primary">
                                        Salvar
                                    </Button>
                                }
                                {loading &&
                                    <Button disabled variant="contained" color="primary">
                                        Salvar
                                </Button>
                                }
                            </ProductButtons>

                        </ProductDetails>

                    </ProductInfoArea>
                </AreaFotoDesc>
                <div style={{ display: 'flex', height: 610, flexDirection: 'column', justifyContent: 'center', alignItems: 'center', background: '#eee', marginRight: 400, borderRadius: 10 }}>
                    <p style={{ textAlign: 'center', fontFamily: 'Roboto Normal', fontWeight: 'bold' }}>Subcategorias disponivieis</p>
                    <SelecionaSubcategoiras id_produto={data.id}  />
                </div>
            </ProductArea>

        </Container>
    )
}