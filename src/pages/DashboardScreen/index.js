import React, { useState, useEffect } from 'react';

import { Title, Conteiner, GraficoArea, AreaBar, AreaLine } from './styled'
import useApi from '../../Helpers/AppharmaApi'
import { ErrorMessage } from '../../AppStyled'
import { useDispatch, useSelector } from 'react-redux'
import { Bar, Line } from '@reactchartjs/react-chart.js';

function Dashboard() {
    const api = useApi();
    const token = useSelector(state => state.userReducer.token)
    const [state, setState] = useState([])
    const [stateLine, setStateLine] = useState([])
    const [error, setError] = useState('')


    useEffect(() => {

        const carregaGrafico = async () => {
            const ret = await api.getGraficoVendas(token);
            const data = ret;

            data.map(i => {
                let auxiliar = i.data_venda
                auxiliar = auxiliar.split('-')
                let dia = auxiliar[2]
                let mes = auxiliar[1]
                let ano = auxiliar[0]
                i.data_venda = `${dia}/${mes}/${ano}`
            })


            const obj = {
                labels: data.map(i => i.data_venda),
                datasets: [
                    {
                        label: 'Cancelado',
                        fill: false,
                        backgroundColor: 'rgba(255, 0, 0, 0.2)',
                        borderColor: 'rgba(255, 0, 0, 1)',
                        borderWidth: 2,
                        data: data.map(i => {
                            if (i.status === 'Cancelado') {
                                return i.totalvenda;
                            }
                        })
                    },
                    {
                        label: 'Finalizado',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(0, 155, 0, 0.2)',
                        borderColor: 'rgba(0, 155, 0, 1)',
                        borderWidth: 2,
                        data: data.map(i => {
                            if (i.status === 'Finalizado') {
                                return i.totalvenda;
                            }
                        })
                    },
                ]
            }


            let labels = [];

            data.map(i => {
                if (i.status === 'Finalizado') {
                    labels.push(i)
                }
            })


            const objLine = {
                labels: labels.map(i => i.data_venda),
                datasets: [
                    {
                        label: 'Finalizado',
                        fill: false,
                        lineTension: 0.1,
                        backgroundColor: 'rgba(0, 155, 0, 0.2)',
                        borderColor: 'rgba(0, 155, 0, 1)',
                        borderWidth: 2,

                        data: labels.map(i => i.totalvenda)
                    },
                ]
            }


            setState(obj)
            setStateLine(objLine)







        }

        carregaGrafico()

    }, [])


    return (
        <Conteiner>
            <Title>Dashboard</Title>
            <GraficoArea>
                <AreaBar>
                    <Bar
                        data={state}
                        width={600}
                        height={400}

                        options={{
                            title: {
                                display: true,
                                text: 'Valor de vendas por status/dia',
                                fontSize: 20,

                            },
                            legend: {
                                display: true,
                                position: 'right'
                            }
                        }}
                    />
                </AreaBar>
                <AreaLine>
                    <Line
                        data={stateLine}
                        width={600}
                        height={400}

                        options={{
                            title: {
                                display: true,
                                text: 'Valor de vendas por dia',
                                fontSize: 20,

                            },
                            legend: {
                                display: true,
                                position: 'right'
                            }
                        }}
                    />
                </AreaLine>

            </GraficoArea>

        </Conteiner>
    )
}

export default Dashboard;