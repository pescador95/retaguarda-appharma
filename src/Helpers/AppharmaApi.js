import axios from 'axios';
import d from '../config/padroes'

const api = axios.create({
    baseURL: d.API_URL,
})

let bearer = 'Bearer';


const AppApi = {
    login: async (cpf, password) => {
        try {
            const resp = await api.post('sessions', { cpf, password }, { headers: {} })
            return resp.data
        } catch (e) {
            return { error: e.response.data.error }
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
            return { error: e.response.data_error }
        }
    },
    sendMessage: async (token, tipo, idUser) => {
        try {
            console.log("Vou mandar mensagem, recebi esse token: " + token + " e esse user " + idUser)
            const resp = await api.post(`sendmessage/${idUser}/${tipo}`, {}, {
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
    }
}

export default () => AppApi;