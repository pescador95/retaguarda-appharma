const initialState = {
   token:'',
   name:'',
   admin:false,
   status:false, 
 };
 
 export default (state = initialState, action) => {
    switch (action.type) {
       case 'CLEAR_AUTH':
          return initialState
       case 'SET_TOKEN':
          return {...state, token: action.payload.token};
          break;
       case 'SET_ADMIN':
          return {...state, admin:action.payload.admin}
          break;
      case 'SET_STATUS':
            return {...state, status:action.payload.status}
            break;
      case 'SET_NAME':
            return { ...state, name:action.payload.name}
            break;
    }
 
    return state;
 };