import jwt_decode from "jwt-decode";
 
const TokenHandler = async (token) => {
   let decoded = jwt_decode(token);
   let agora = new Date()
   if (decoded.exp < agora.getDate()){
      return {expirou:true, admin:decoded.admin}
   } else {
      return {expirou:false, admin:decoded.admin}
   }
}

export default TokenHandler