import React, { useState, useEffect } from 'react';

import InputMask from 'react-input-mask';

import MaskedInput from 'react-text-mask'
import createNumberMask from 'text-mask-addons/dist/createNumberMask'

import { ConfigArea, Title, Conteiner } from './styled'
import useApi from '../../Helpers/AppharmaApi'
import { ErrorMessage } from '../../AppStyled'
import {SuccessMessage} from '../../AppStyled'
import { useDispatch, useSelector } from 'react-redux'

function Configurar() {
    const api = useApi();
    const dispatch = useDispatch();
    const [whatsapp, setWhatsapp] = useState('');
    const [cnpj, setCnpj] = useState('');
    const [password, setPassword] = useState('');
    const [disable, setDisable] = useState(false);
    const [error, setError] = useState('');
    const [success, setSuccess] = useState('');
    const [previsao, setPrevisao] = useState('');
    const [taxa, setTaxa] = useState('');
    const [nomeLoja, setNomeLoja] = useState('')
    const token = useSelector(state => state.userReducer.token);
    const [codigoLoja, setCodigoLoja] = useState('')


    useEffect(() => {
        const carregaParametros = async () => {
            const resp = await api.getConfigs(token)
            if(resp.error){
                setError("Não consegui carregar info: "+ resp.error.message)
                return
            }
            setTaxa(`R$ ${resp[0].taxa_entrega}`)
            setWhatsapp(resp[0].whatsapp)
            setCnpj(resp[0].cnpj)
            setPrevisao(resp[0].prazo_entrega)
            setNomeLoja(resp[0].descricao)
            setCodigoLoja(resp[0].id)
        }
        carregaParametros()
    }, [])

    const handleSubmit = async (e) => {

        e.preventDefault();

        const body = {
            cnpj,
            whatsapp: whatsapp.replace(/[^0-9]+/g, ""),
            taxa_entrega: taxa.replace(/[^0-9]+/g, ""),
            previsao,
            descricao: nomeLoja
        }

        const resp = await api.putConfig(token, codigoLoja, body);

        if (resp.error){
            setError("Não consegui salvar: "+resp.error)
            return
        }

        setSuccess("Salvo com sucesso!")

    }



    const mask = createNumberMask({
        prefix: 'R$ ',
        includeThousandsSeparator: true,
        thousandsSeparatorSymbol: '.',
        allowDecimal: true,
        decimalSymbol: ','
    })

    return (
        <Conteiner>
            <Title>Configurações</Title>
            <ConfigArea>
                {error &&
                    <ErrorMessage>{error}</ErrorMessage>
                }
                {success &&
                    <SuccessMessage>{success}</SuccessMessage>
                }

                <form onSubmit={handleSubmit}>
                    <label className="area">
                        <div className="area--title">CNPJ:</div>
                        <div className="area--input">
                            <InputMask mask="99.999.999/9999-99" maskChar={null} disabled={disable} value={cnpj} required onChange={e => setCnpj(e.target.value)} />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Nome Loja (Descrição):</div>
                        <div className="area--input">
                            <input type="text" disabled={disable} value={nomeLoja} required onChange={e => setNomeLoja(e.target.value)} />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">WhatsApp:</div>
                        <div className="area--input">
                            <InputMask mask="(99) 99999-9999" maskChar={null} disabled={disable} value={whatsapp} placeholder="(45) 99999-0000"
                                required onChange={e => setWhatsapp(e.target.value)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Prazo de entrega: (Minutos)</div>
                        <div className="area--input" >
                            <input type="number" disabled={disable} value={previsao} onChange={e => setPrevisao(e.target.value)} />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title">Taxa de entrega:</div>
                        <div className="area--input" >
                            <MaskedInput
                                mask={mask}
                                disabled={disable}
                                placeholder="R$"
                                value={taxa}
                                onChange={e => setTaxa(e.target.value)}
                            />
                        </div>
                    </label>
                    <label className="area">
                        <div className="area--title"></div>
                        <div className="area--input">
                            <button disabled={disable} >Salvar</button>
                        </div>
                    </label>
                </form>
            </ConfigArea>
        </Conteiner>
    )
}

export default Configurar;