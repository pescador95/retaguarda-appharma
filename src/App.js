import React from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import ShopConfigScreen from './pages/ShopConfigScreen';
import ConfigScreen from './pages/ConfigScreen'

import DashboardScreen from './pages/DashboardScreen'

import OrderScreen from './pages/OrderScreen';

import { Conteiner, Menu, PageBody } from './AppStyled';
import MenuItem from './components/MenuItem';

import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Profile from './pages/Profile'

import Categorias from './pages/Categorias'

import ReactTooltip from 'react-tooltip'

import {useSelector} from 'react-redux'


const Page = () => {
    document.title = "R E T A G U A R D A  - [ Appharma ]";

    const superadm = useSelector(state => state.userReducer.superadmin);


    return (
        <BrowserRouter>
            <Conteiner>
                <Menu>
                    <MenuItem title="Dashboard" icon="/assets/dashboard.png" link="/dashboard" />
                    <MenuItem title="Pedidos" icon="/assets/order.png" link="/" />
                    <MenuItem title="Produtos" icon="/assets/store.png" link="/loja" />
                    <MenuItem title="Configurações" icon="/assets/engrenagem.png" link="/configuracao" />
                    { superadm &&
                    <MenuItem title="Categorias" icon="/assets/categories.png" link="/categorias" />}
                    <MenuItem title="Perfil" icon="/assets/profile.png" link="/perfil" />
                    
                </Menu>
                <PageBody>


                    <Switch>
                        <PrivateRoute exact path="/">
                            <OrderScreen />
                        </PrivateRoute>
                        <PrivateRoute exact path="/dashboard">
                            <DashboardScreen />
                        </PrivateRoute>
                        <PrivateRoute exact path="/loja">
                            <ShopConfigScreen />
                        </PrivateRoute>
                        <PrivateRoute exact path="/configuracao">
                            <ConfigScreen />
                        </PrivateRoute>
                        <PrivateRoute exact path="/perfil">
                            <Profile />
                        </PrivateRoute>
                        <Route exact path="/login">
                            <Login />
                        </Route>
                        <Route exact path="/categorias">
                            <Categorias />
                        </Route>
                        <Route>
                            <NotFound />
                        </Route>
                    </Switch>


                </PageBody>
                {/* <Cart /> */}
                <ReactTooltip id="tip-top" place="top" effect="solid" />
                <ReactTooltip id="tip-right" place="right" effect="solid" />


            </Conteiner>


        </BrowserRouter>
    );
}

export default Page;