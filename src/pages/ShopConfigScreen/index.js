import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Container, ProductArea, ProductList, ProductPaginationArea, ProductPaginationItem } from './styled';
import Modal from '../../components/Modal'
import Header from '../../components/Header'
import { useSelector } from 'react-redux'
import useApi from '../../Helpers/AppharmaApi'
import ProductItem from '../../components/ProductItem'
import ModalProduct from '../../components/ModalProduct'

let searchTimer = null;

export default () => {
    const [activeSearch, setActiveSearch] = useState('')
    const history = useHistory();
    const token = useSelector(state => state.userReducer.token);
    const [idProduto, setIdProduto] = useState(0)
    const api = useApi();
    const [produtos, setProdutos] = useState([])
    const [headerSearch, setHeaderSearch] = useState('');
    const [totalPages, setTotalPages] = useState(0);
    const [activePage, setActivePage] = useState(0);
    const [productVisible, setProductVisible] = useState(false);
    const [productImage, setProductImage] = useState('');
    const [productName, setProductName] = useState('');
    const [refresh, setRefresh] = useState(false);


    const getProdutos = async () => {
        const prods = await api.getProdutos(activePage, activeSearch)
        if (!prods.error) {
            setProdutos(prods.produtos)
            setTotalPages(prods.paginas)
            setActivePage(prods.pagina)
        }
    }

    useEffect(() => {
        if(refresh){
            window.location.reload(); 
        }
    }, [refresh])

    useEffect(() => {
        clearTimeout(searchTimer);
        searchTimer = setTimeout(() => {
            setActiveSearch(headerSearch)
        }, 2000);

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
                                setVisible ={setProductVisible}
                                selected={setIdProduto}
                                setProductImage={setProductImage}
                                setProductName={setProductName}
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

            <Modal active={productVisible} setActive={setProductVisible} >
                <ModalProduct  idProduto={idProduto} imgUrl={productImage} nome={productName} refreshPage={setRefresh} setProductImage={setProductImage}/>
            </Modal>

        </Container>
    );
}