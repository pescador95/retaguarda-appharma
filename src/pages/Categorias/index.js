import React, { useState, useEffect, useRef } from 'react';
import { Title, Conteiner, CategoriaArea, Label, Input, Buttom, Body, ButtomArea, ImportaIconeCategoria, IconeArea, CategoriaListArea, CategoriaList, SubCategoriaListArea, SubCategoriaList, SubCategoriaArea } from './styled'
import ItemCategoria from '../../components/ItemCategoria'
import ItemSubCategoria from '../../components/ItemSubCategoria'
import { useSelector } from 'react-redux'
import useApi from '../../Helpers/AppharmaApi'
import TextField from '@material-ui/core/TextField';
import { ErrorMessage } from '../../AppStyled'


function Page() {

    const [listaDeCategorias, setListaDeCategorias] = useState([0])
    const [listaDeSubCategorias, setListaDeSubCategorias] = useState([0])
    const [categoria, setCategoria] = useState('')
    const [subCategoria, setSubCategoria] = useState('')
    const [codigoCategoria, setCodigoCategoria] = useState(0)
    const fileField = useRef();
    const inputCategoria = useRef();
    const superadm = useSelector(state => state.userReducer.superadmin)
    const api = useApi()
    const token = useSelector(state => state.userReducer.token)
    const [error, setError] = useState("")
    const subCatRef = useRef()
    const [codigoSubCategoria, setCodigoSubCategoria] = useState(0)
    const [deleta, setDeleta] = useState(0)
    const [deletaSubCategoria, SetDeletaSubCategoria] = useState(0)


    useEffect(() => {
        if (deleta === 0) { return }
        let novaCategoria = listaDeCategorias.filter(i => i.id !== deleta)
        setListaDeCategorias(novaCategoria)
    }, [deleta])

    useEffect(() => {
        if (deletaSubCategoria === 0) { return }
        let novaCategoria = listaDeSubCategorias.filter(i => i.id !== deletaSubCategoria)
        setListaDeSubCategorias(novaCategoria)
    }, [deletaSubCategoria])


    useEffect(() => {
        if (error === '') { return }

        setTimeout(() => {
            setError('')
        }, 3000)

    }, [error])


    useEffect(() => {
        let unmonted = false;

        if (!unmonted) {
            carregaSubcategorias(codigoCategoria)
        }

        return () => unmonted = true;

    }, [codigoCategoria])

    useEffect(() => {

        let unmonted = false;

        if (!unmonted) {
            carregaCategorias()
        }

        return () => unmonted = true;

    }, [])

    const carregaCategorias = async () => {
        const data = await api.getCategorias();
        setListaDeCategorias(data)
    }

    const carregaSubcategorias = async () => {
        console.log("vou carregar subcategorias....")
        const data = await api.getSubCategorias(codigoCategoria)
        setListaDeSubCategorias(data)
    }



    const handleSave = async () => {

        if (!fileField.current.files[0] && codigoCategoria === 0  ) {
            setError("Adicione uma imagem para a categoria!")
            return
        }

        if (categoria === '') {
            setError("Digite uma descrição para a categoria!")
            return
        }


        const fData = new FormData();
        let id_img = null;

        if (fileField.current.files[0]) {
            fData.append('file', fileField.current.files[0])
            let resposta = await api.sendPhoto(token, fData);
            let id  = resposta.resp.data.imgId
            id_img = id
            console.log("Esté o o id que vou salvear" + id_img)
        }

        if (codigoCategoria > 0) {
            await api.putCategorias(token, categoria, codigoCategoria, id_img)
        } else {
            await api.postCategorias(token, categoria, id_img)
        }


        subCatRef.current.focus()
        carregaCategorias()

    }

    const handleSaveSubCateogria = async () => {
        if (codigoCategoria <= 0) {
            setError("Selecione uma categoria para adicionar!");
            return;
        }
        if (subCategoria === '') {
            setError("Digite uma descrição para a subcategoria!")
            return
        }

        if (codigoSubCategoria > 0){
            await api.putSubCategorias(token, subCategoria, codigoSubCategoria)
        } else {
            await api.postSubCategorias(token, subCategoria, codigoCategoria)
        }


        carregaSubcategorias()
    }

    const handleNovo = () => {
        if (codigoCategoria === 0) {
            return;
        }

        setCodigoCategoria(0);
        setCategoria('')
        inputCategoria.current.focus()

    }

    const handleNovoSubCategoria = () => {
        if (codigoCategoria === 0) {
            setError("Selecione uma categoira para adicionar")
            return;
        }

        setCodigoSubCategoria(0);
        setSubCategoria('')
        subCatRef.current.focus()

    }


    return (
        <Conteiner>
            {superadm &&
                <>
                    <Title>Cadastro de Categorias e Sub-Categorias</Title>
                    <Body>
                        {error &&
                            <ErrorMessage>{error}</ErrorMessage>
                        }
                        <CategoriaArea>
                            <TextField
                                label="Categoria"
                                id="outlined-size-small"
                                variant="outlined"
                                size="small"
                                ref={inputCategoria}
                                style={{ width: 300 }}
                                value={categoria} onChange={(e) => setCategoria(e.target.value)}
                            />
                            <IconeArea>
                                <Label>Icone:</Label>
                                <ImportaIconeCategoria type="file" ref={fileField} />
                            </IconeArea>
                            <ButtomArea>
                                <Buttom active={true} onClick={() => handleSave()}>  {codigoCategoria === 0 ? 'Adicionar' : 'Salvar'}</Buttom>
                                <Buttom active={codigoCategoria === 0 ? false : true} onClick={() => handleNovo()}>  Novo </Buttom>
                            </ButtomArea>
                        </CategoriaArea>
                        <CategoriaListArea>
                            <CategoriaList>
                                {
                                    listaDeCategorias.map((i, k) => {
                                        return <ItemCategoria key={k} data={i} codigoSelecionado={setCodigoCategoria} categoria={setCategoria} codigoAtivo={codigoCategoria} setDeleta={setDeleta} />
                                    })
                                }
                            </CategoriaList>
                        </CategoriaListArea>
                        <SubCategoriaListArea>
                            {listaDeSubCategorias.length > 0 &&
                                <Label color='#fffD'>Subcategorias:</Label>
                            }
                            <SubCategoriaList>
                                {
                                    listaDeSubCategorias.map((i, k) => {
                                        return <ItemSubCategoria key={k} data={i} setCodigoSubCategoria={setCodigoSubCategoria} SetDeletaSubCategoria={SetDeletaSubCategoria}/>
                                    })
                                }
                            </SubCategoriaList>

                        </SubCategoriaListArea>
                        <SubCategoriaArea>
                            <TextField
                                label="Sub Categoria"
                                id="outlined-size-small"
                                variant="outlined"
                                size="small"
                                style={{ width: 300 }}
                                value={subCategoria} onChange={(e) => setSubCategoria(e.target.value)} ref={subCatRef} />

                            <ButtomArea>
                                <Buttom active={codigoCategoria === 0 ? false : true} onClick={() => handleSaveSubCateogria()}>  {codigoSubCategoria === 0 ? 'Adicionar' : 'Salvar'}</Buttom>
                                <Buttom active={codigoSubCategoria === 0 ? false : true} onClick={() => handleNovoSubCategoria()}>  Novo </Buttom>
                            </ButtomArea>
                        </SubCategoriaArea>
                    </Body>



                </>}
            {!superadm &&
                <Title>Acesso proibido</Title>
            }
        </Conteiner>
    )
}

export default Page;