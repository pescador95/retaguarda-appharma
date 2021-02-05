import React, { useState, useEffect, useRef } from 'react';
import { Title, Conteiner, Body, ButtomArea, MessageArea } from './styled'
import Button from '@material-ui/core/Button';
import SendIcon from '@material-ui/icons/Send';
import { useSelector } from 'react-redux'
import useApi from '../../Helpers/AppharmaApi'
import TextField from '@material-ui/core/TextField';
import { ErrorMessage, SuccessMessage } from '../../AppStyled'

import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    button: {
        margin: theme.spacing(1),
        fontSize: 12
    },
}));


function Page() {

    const classes = useStyles();
    const [mensagem, setMensagem] = useState('')
    const [titulo, setTitulo] = useState('')
    const [error, setError] = useState("")
    const [success, setSuccess] = useState('')
    const subCatRef = useRef()
    const api = useApi()
    const token = useSelector(state => state.userReducer.token)
    const [loading, setLoading] = useState(false)

    useEffect(() => {
        if (error === '' && success === '') { return }

        setTimeout(() => {
            setError('')
            setSuccess('')
        }, 3000)

    }, [error, success])

    const sendMessage = async () => {

        if (loading) {return}

        if (titulo === ''){
            setError('Digite um titulo para a msenagem!');
            return
        }
        if (mensagem === ''){
            setError('Digite uma msenagem!');
            return
        }

        setLoading(true)
        await api.sendBroadcast(token, mensagem, titulo)
        setLoading(false)
    }


    return (
        <Conteiner>
            <>
                <Title>Enviar notificação para todos os clientes</Title>
                <Body>
                    {error &&
                        <ErrorMessage>{error}</ErrorMessage>
                    }
                    {success &&
                        <SuccessMessage>{success}</SuccessMessage>
                    }
                    <MessageArea>
                        <TextField
                            label="Titulo da Mensagem"
                            id="outlined-size-small"
                            variant="outlined"
                            size="small"
                            style={{ width: 250, marginBottom:10 }}
                            value={titulo} onChange={(e) => setTitulo(e.target.value)} ref={subCatRef} />
                        <TextField
                            label="Digite a mensagem"
                            id="outlined-size-small"
                            variant="outlined"
                            size="small"
                            style={{ width: 500, marginBottom:10 }}
                            value={mensagem} onChange={(e) => setMensagem(e.target.value)} ref={subCatRef} />

                        <ButtomArea>
                            <Button
                                onClick={() => sendMessage()}
                                variant="contained"
                                color="primary"
                                className={classes.button}
                                endIcon={<SendIcon style={{ fontSize: 20, color: '#fff' }} color="inherit" />}
                            >
                                Enviar
                            </Button>
                        </ButtomArea>
                    </MessageArea>
                </Body>
            </>
        </Conteiner>
    )
}

export default Page;