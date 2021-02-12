import React, {useState, useEffect} from 'react'
import { Conteiner, CategoriaIcone, Label } from './styled'
import useApi from '../../Helpers/AppharmaApi'
import {useSelector} from 'react-redux'

const Page = ({ data, categoria }) => {

    const [escolha, setEscolha] = useState('');
    const api = useApi()
    const token = useSelector(state => state.userReducer.token)

    const handleClick = (id) => {

        console.log(id)
        categoria(id)



    }

    return (
        <Conteiner onClick={() => handleClick(data.id)}>
            <CategoriaIcone src={data.image ? `${data.image.url}` : "/assets/nopicture.png"} />
            <Label>{data.descricao}</Label>
        </Conteiner>
    )
}

export default Page;