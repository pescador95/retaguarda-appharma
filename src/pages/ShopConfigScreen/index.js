import React, { useState, useEffect } from 'react';
import { useHistory } from "react-router-dom";
import { Container, ProductArea, ProductList, ProductPaginationArea, ProductPaginationItem } from './styled';
import Header from '../../components/Header'
import { useSelector } from 'react-redux'
import useApi from '../../Helpers/AppharmaApi'
import Pagination from '@material-ui/lab/Pagination';
import ProductItem from '../../components/ProductItem'
import { makeStyles } from '@material-ui/core/styles';

const useStyles = makeStyles((theme) => ({
    root: {
        '& > * + *': {
            marginTop: theme.spacing(2),
        },
    },
}));


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
    const [loading, setLoading] = useState(false)


    const getProdutos = async () => {
        setLoading(true)
        const prods = await api.getProdutos(activePage, activeSearch)
        if (!prods.error) {
            setProdutos(prods.produtos)
            setTotalPages(prods.paginas)
            setActivePage(prods.pagina)
        }
        setLoading(false)
    }

    useEffect(() => {
        let unmonted = false;
        clearTimeout(searchTimer);
        if (!unmonted) {
            searchTimer = setTimeout(() => {
                setActiveSearch(headerSearch)
            }, 5000);
            setActivePage(0)
        }

        return () => unmonted = true

    }, [headerSearch])

    useEffect(() => {
        let unmonted = false
        if (!unmonted) {
            console.log("Vou dar um getProdutos... ")
            getProdutos();
        }

        return () => unmonted = true;
    }, [activePage, activeSearch])

    const handleChange = (event, value) => {
        if(!loading){
            setActivePage(value);
        }
      };
    const classes = useStyles();

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
                    <div className={classes.root} style={{marginTop:20, marginBottom:20}}>
                        <Pagination count={totalPages} page={parseFloat(activePage)} onChange={handleChange} />
                    </div>
                </ProductArea>
            }
        </Container>
    );
}