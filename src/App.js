import React, { useEffect } from 'react';
import { BrowserRouter, Switch, Route } from "react-router-dom";

import ShopConfigScreen from './pages/ShopConfigScreen';
import ConfigScreen from './pages/ConfigScreen'

import OrderScreen from './pages/OrderScreen';

import { Conteiner, Menu, PageBody } from './AppStyled';
import MenuItem from './components/MenuItem';

import PrivateRoute from './components/PrivateRoute';
import NotFound from './pages/NotFound'
import Login from './pages/Login'
import Profile from './pages/Profile'

import ReactTooltip from 'react-tooltip'


export default () => {
    document.title = "R E T A G U A R D A  - [ Appharma ]";


    return (
        <BrowserRouter>
            <Conteiner>
                <Menu>
                    <MenuItem title="Pedidos" icon="/assets/order.png" link="/" />
                    <MenuItem title="Produtos" icon="/assets/store.png" link="/loja" />
                    <MenuItem title="Configurações" icon="/assets/engrenagem.png" link="/configuracao" />
                    <MenuItem title="Perfil" icon="/assets/profile.png" link="/perfil" />
                </Menu>
                <PageBody>


                    <Switch>
                        <PrivateRoute exact path="/">
                            <OrderScreen />
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