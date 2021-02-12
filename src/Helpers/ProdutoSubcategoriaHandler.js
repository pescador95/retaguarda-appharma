
import useApi from './AppharmaApi'

const ProdSubHandler = async (token, id_produto, source, draggableId) =>{

    const api = useApi();

    if (source.droppableId === "2") {
        await api.deleteProdutoSubcategoria(token, id_produto, draggableId)
    } else {
        await api.postProdutoSubcategoria(token, id_produto, draggableId)  
    }

}

export default ProdSubHandler