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
                resp = await api.get(`/produtos/search?name=${(search.toUpperCase())}&${ page>0 ? '?page='+page : '' }`)
                console.log(`/produtos/search?name=${search}&${ page>0 ? '?page='+page : '' }`)
            }
            
            return resp.data
        } catch (e) {
            return { error: e.response.data_error }
        }
    },

    sendPhoto: async(token, fData) => {
        try {
            const resp = await api.post(`files`, fData, {
                headers:{ "Content-Type": `multpart/form-data; boundary=${fData._boundary}`, 'auth':`${bearer} ${token}, 'Access-Control-Allow-Origin':'https://retaguarda.approachmobile.company'`},
                crossDomain: true
            })
            console.log(resp)
            return { resp }
        } catch (e) {
            console.log(e)
            return { error: e }
        }
    }
}

export default () => AppApi;