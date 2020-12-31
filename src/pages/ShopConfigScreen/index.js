import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Container, ProductArea, ProductList, ProductPaginationArea, ProductPaginationItem } from './styled';
import Header from '../../components/Header'
import { useSelector } from 'react-redux'
import useApi from '../../Helpers/AppharmaApi'
import ProductItem from '../../components/ProductItem'

let searchTimer = null;

export default () => {
    const [activeSearch, setActiveSearch] = useState('')
    const history = useHistory();
    const token = useSelector(state => state.userReducer.token);
    const api = useApi();
    const [produtos, setProdutos] = useState([])
    const [headerSearch, setHeaderSearch] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const [activePage, setActivePage] = useState(0);


    const getProdutos = async () => {
        const prods = await api.getProdutos(activePage, activeSearch)
        if (!prods.error) {
            setProdutos(prods.produtos)
            setTotalPages(prods.paginas)
            setActivePage(prods.pagina)
        }
    }

    useEffect(() => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
            setActiveSearch(headerSearch)
        }, 2000);
        setActivePage(0)

    }, [headerSearch])

    useEffect(() => {
        getProdutos();
    }, [activePage, activeSearch])

    return (
        <Container>
            <Header search={headerSearch} onSearch={setHeaderSearch} title="Busca de Produtos" whatSearch="Digite o nome do produto" />

            {produtos.length > 0 &&
                <ProductArea>
                    <ProductList>
                        {produtos.map((item, index) => (
                            <ProductItem
                                key={index}
                                data={item}
                                getProdutos={getProdutos}
                                />
                        ))}
                    </ProductList>
                    {totalPages > 0 &&
                        <ProductPaginationArea>
                            {Array(totalPages).fill(0).map((item, index) => (
                                <ProductPaginationItem key={index} active={activePage} current={index + 1} onClick={() => setActivePage(index + 1)}>
                                    {index + 1}
                                </ProductPaginationItem>
                            ))

                            }
                        </ProductPaginationArea>
                    }
                </ProductArea>
            }
        </Container>
    );
}