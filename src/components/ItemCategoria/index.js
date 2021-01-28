import React, {useState, useEffect} from 'react'
import { Conteiner, CategoriaIcone, Label } from './styled'
import Buttom from '../../components/Buttom'
import useApi from '../../Helpers/AppharmaApi'
import {useSelector} from 'react-redux'

const Page = ({ data, codigoSelecionado, codigoAtivo, categoria, setDeleta }) => {

    const [escolha, setEscolha] = useState('');
    const api = useApi()
    const token = useSelector(state => state.userReducer.token)

    useEffect(()=>{
        if (escolha === '') { return }
        const deletar = async () => {
            await api.deleteCategorias(token, data.id)
        }
        deletar()
        console.log("Vou setar deleta..")
        setDeleta(data.id)
    }, [escolha])


    const handleClick = (e) => {
        if (e.target.classList.contains('trash')) {
          return;
        }
        console.log("Vou selecionar o id: " + data.id)
        codigoSelecionado(data.id)
        categoria(data.descricao)
    }

    return (
        <Conteiner onClick={(e) => handleClick(e)} ativo={data.id === codigoAtivo ? true : false}>
            <CategoriaIcone src={data.image ? `${data.image.url}` : "/assets/nopicture.png"} />
            <Label>{data.descricao}</Label>
            <Buttom setEscolha={setEscolha}  />
        </Conteiner>
    )
}

export default Page;