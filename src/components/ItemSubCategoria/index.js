import React, {useState, useEffect} from 'react'
import {Conteiner} from './styled'
import Chip from '../../components/Chip'
import useApi from '../../Helpers/AppharmaApi'
import {useSelector} from 'react-redux'

const Page = ({data, setCodigoSubCategoria, SetDeletaSubCategoria}) => {
    const api = useApi()
    const [action, setAction] = useState('')
    const token = useSelector(state => state.userReducer.token)

    useEffect(()=>{
        if(action === ''){return}
        if(action === 'delete'){
            const deletar = async () => {
                const resp = await api.deleteSubCategorias(token, data.id)
            }
            deletar()
            SetDeletaSubCategoria(data.id)

        }
        if(action === 'click'){
            setCodigoSubCategoria(data.id)
        }
    }, [action])


    const handleClick = () =>{
            setCodigoSubCategoria(data.id)   
    }

    return (
        <Conteiner onClick={()=>handleClick()}>
            <Chip nome={data.descricao} setAction={setAction}/>
        </Conteiner>
    )
}

export default Page;