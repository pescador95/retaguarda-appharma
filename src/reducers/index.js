import { combineReducers } from 'redux';
import userReducer from './UserReducer';
import shopReducer from './ShopReducer'

export default combineReducers({
    userReducer,
    shopReducer
});