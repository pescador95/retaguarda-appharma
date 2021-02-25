import axios from 'axios';
import env from "react-dotenv";

const api = axios.create({
    baseURL: env.API_URL,
})

let bearer = 'Bearer';


const AppApi = {
    login: async (cpf, password) => {
        try {
            console.log("Estou tentando logar com: "+env.API_URL)
            const resp = await api.post('sessions', { cpf, password }, { headers: {} })
            return resp.data
        } catch (e) {
            return { error: e }
        }
    },
    getVendas: async (token) => {
        try {
            const resp = await api.get('venda/', {
                headers: { auth: `${bearer} ${token}` }
            })
            return resp.data
        } catch (e) {
            return { error: e.response.data_error }
        }
    },
    getItemsOrder: async (token, codVenda) => {
        try {
            const resp = await api.get(`venda/${codVenda}`, {
                headers: { auth: `${bearer} ${token}` }
            })
            return resp.data
        } catch (e) {
            return { error: e }
        }
    },
    sendMessage: async (token, tipo, idUser, idVenda) => {
        try {
            console.log("Vou mandar mensagem, recebi esse token: " + token + " e esse user " + idUser)
            const resp = await api.post(`sendmessage/${idUser}/${tipo}/${idVenda}`, {}, {
                headers: { auth: `${bearer} ${token}` }
            })

            return {}

        } catch (e) {
            return { error: e.response.data_error }
        }

    },
    sendBroadcast: async (token, title, mensagem) => {
        try {
            const resp = await api.post(`sendmessage/all`, {title, mensagem}, {
                headers: { auth: `${bearer} ${token}` }
            })

            return {}

        } catch (e) {
            return { error: e.response.data_error }
        }

    },
    changeStatus: async (token, status, codigo_venda, usuario_alteracao) => {
        try {
            const resp = await api.put(`venda`, {
                codigo_venda,
                status,
                usuario_alteracao
            }, {
                headers: {
                    auth: `${bearer} ${token}`
                }
            })
            return { success: "Status da venda alterada com sucesso!" }
        } catch (e) {
            
            return { error: e.response.data_error }
        }
    },
    getProdutos: async (page, search) => {
        try {
            let resp;
            if (!search){
                resp = await api.get(`/produtos${ page>0 ? '?page='+page : '' }`)
            }else {
                resp = await api.get(`/produtos/search?name=${(search.toUpperCase())}&${ page>0 ? 'page='+page : '' }`)
            }
            
            return resp.data
        } catch (e) {
            return { error: e.response.data_error }
        }
    },
    putProduto: async (token, {descricao, id_img, id_produto}) =>{
        try {
            const resp = await api.put(`/ret/produtos/${id_produto}`, {descricao, img_id:id_img}, {
                headers:{auth:`${bearer} ${token}`}
            })
            return { resp }
        } catch (e) {
            console.log(e)
            return { error: e }
        }     
    },

    sendPhoto: async(token, fData) => {
        try {
            const resp = await api.post(`files`, fData, {
                headers:{auth:`${bearer} ${token}`, 'Content-Type':'multipart/form-data'}
            })
            return { resp }
        } catch (e) {
            console.log(e)
            return { error: e }
        }
    },

    baixarReservas: async(token, codigo_venda) => {
        try{
            const resp = await api.put(`reserva/${codigo_venda}`,{}, {
                headers:{auth:`${bearer} ${token}`}
            })
            return {resp}
        } catch(e){
            console.log(e)
            return {error: e}
        }
    },

    cancelarResarvas: async(token, codigo_venda) =>{
        try{
            const resp = await api.put(`reserva/cancelar/${codigo_venda}`,{}, {
                headers:{auth:`${bearer} ${token}`}
            })
            return {resp}
        } catch(e){
            console.log(e)
            return {error: e}
        }
    },

    getConfigs: async(token) =>{
        try{
            const resp = await api.get(`loja`, {
                headers:{auth:`${bearer} ${token}`}
            })
            return resp.data
        } catch(e){
            console.log(e)
            return {error: e}
        }
    },

    putConfig: async(token, codigoLoja, body) => {
        try{
            const resp = await api.put(`loja/${codigoLoja}`, body, {
                headers:{auth:`${bearer} ${token}`}
            })
            return {resp}
        }catch(e){
            console.log(e)
            return {error:e}
        }
    },

    getGraficoVendas: async(token) =>{
       try{
        const resp = await api.get(`grafico/vendas`, {
            headers:{auth:`${bearer} ${token}`}
        })
        return resp.data

       } catch(e){
           console.log(JSON.stringify(e))
           return {error:e}
       }
    },

    getCategorias: async() =>{
        try{
            const resp = await api.get(`categorias`)
            return resp.data

        } catch(e){
            console.log(JSON.stringify(e))
            return {error:e}
        }
    },
    getSubCategorias: async (id_categoria) =>{
        try{
            const resp = await api.get(`subcategorias/${id_categoria}`)
            return resp.data

        } catch(e){
            console.log(JSON.stringify(e))
            return {error:e}
        }
    },

    getSubcategoriasProduto: async (token, id_produto, tipo) =>{
        try{

            const resp = await api.get(`prod/sub?id=${id_produto}&tipo=${tipo}`, {
                headers:{
                    auth: `${bearer} ${token}`
                }
            })
            return resp.data

        } catch(e){
            console.log('DEU PAU: '+JSON.stringify(e))
            return {error:e}
        }
    },

    postCategorias: async(token, descricao, id_img) =>{
        try{
            const resp = await api.post(`categorias`, {descricao, id_img}, {
                headers:{
                    auth: `${bearer} ${token}`
                }
            })
            return resp.data

        } catch(e){
            console.log(JSON.stringify(e))
            return {error:e}
        }
    },
    putCategorias: async(token, descricao, id_categoria, id_img) =>{
        try{
            let resp;
            if (id_img != null){
                resp = await api.put(`categorias?id=${id_categoria}`, {descricao, id_img}, {
                    headers:{
                        auth: `${bearer} ${token}`
                    }
                })
            } else {
                resp = await api.put(`categorias?id=${id_categoria}`, {descricao}, {
                    headers:{
                        auth: `${bearer} ${token}`
                    }
                })
            }
            return resp.data

        } catch(e){
            console.log(JSON.stringify(e))
            return {error:e}
        }
    },
    postSubCategorias: async(token, descricao, id_categoria) =>{
        try{
            const resp = await api.post(`subcategorias`, {id_categoria, descricao}, {
                headers:{
                    auth: `${bearer} ${token}`
                }
            })
            return resp.data

        } catch(e){
            console.log(JSON.stringify(e))
            return {error:e}
        }
    },
    putSubCategorias: async(token, descricao, id) =>{
        try{
            const resp = await api.put(`subcategorias/${id}`, {descricao}, {
                headers:{
                    auth: `${bearer} ${token}`
                }
            })
            return resp.data

        } catch(e){
            console.log(JSON.stringify(e))
            return {error:e}
        }
    },
    deleteCategorias: async(token, id_categoria) => {
        try{
            const resp = await api.delete(`categorias/${id_categoria}`, {
                headers:{
                    auth: `${bearer} ${token}`
                }
            })
            return resp.data

        } catch(e){
            console.log(JSON.stringify(e))
            return {error:e}
        }
    },
    deleteSubCategorias: async(token, id_categoria) => {
        try{
            const resp = await api.delete(`subcategorias/${id_categoria}`, {
                headers:{
                    auth: `${bearer} ${token}`
                }
            })
            return resp.data

        } catch(e){
            console.log(JSON.stringify(e))
            return {error:e}
        }
    },
    postProdutoSubcategoria: async(token, id_produto, id_subcategoria) =>{
        try{
            const resp = await api.post(`produtosubcategoria`, {id_produto, id_subcategoria}, {
                headers:{
                    auth: `${bearer} ${token}`
                }
            })
            return resp.data

        } catch(e){
            console.log(JSON.stringify(e))
            return {error:e}
        }
    },
    deleteProdutoSubcategoria: async(token, id_produto, id_subcategoria) =>{
        try{
            const resp = await api.delete(`produtosubcategoria/${id_produto}/${id_subcategoria}`, {
                headers:{
                    auth: `${bearer} ${token}`
                }
            })
            return resp.data

        } catch(e){
            console.log(JSON.stringify(e))
            return {error:e}
        }
    },
}

export default () => AppApi;