const initialState = {
    taxa_entrega:0,
    whatsapp:'',
    nome:'',
    previsao:''
  };
  
  export default (state = initialState, action) => {
     switch (action.type) {
        case 'CLEAR_AUTH':
           return initialState
        case 'SET_TAXA':
           return {...state, taxa_engrega: action.payload};
           break;
        case 'SET_WHATSAPP':
           return {...state, whatsapp:action.payload}
           break;
       case 'SET_NOME':
             return {...state, nome:action.payload}
             break;
       case 'SET_PREVISAO':
             return { ...state, previsao:action.payload}
             break;
     }
  
     return state;
  };