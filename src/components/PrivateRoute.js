import React from 'react';
import { Route, useHistory } from 'react-router-dom'
import {useSelector} from 'react-redux'

function PrivateRoute({ children, ...rest }) {
   const token = useSelector( state => state.userReducer.token );
   const history = useHistory();
   
   if(!token || token === ''){
      history.push('Login');
      return null;
   }

   return <Route {...rest}>{children}</Route>;
}

export default PrivateRoute;