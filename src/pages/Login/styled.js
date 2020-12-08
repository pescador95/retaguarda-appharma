import styled from 'styled-components'

export const Conteiner = styled.div`
   display:flex;
   flex:1;
   align-items:center;
   justify-content:center;
   flex-direction:column`

export const Title = styled.div`
   margin:20px;
   font-size:28px;
   font-weight:bold;
`

export const LoginArea = styled.div`
   display:flex;
   justify-content:center;
   align-items:center;
   flex-direction:column;


form {
   background-color:#fff;
   border-radius:3px;
   display:flex;
   flex-direction:column;
   align-items:center;
   justify-conent:center;
   padding:10px;
   box-shadow:0px 0px 3px #999;

   .area{
      padding:10px;
      max-width:500px;

      .area--title{
         width:200px;
         text-align:left;
         padding-right:20px;
         font-weight:bold;
         font-size:14px;
         margin:5px;
      }
      .area--input{
         input {
            width:95%;
            font-size:14px;
            padding:5px;
            border:1px solid #ddd;
            border-radius:3px;
            outline:0;
            transition:all ease .4s;

            &:focus{
               border:1px solid #333;
               color:#333;
            }
         }
         button{
            background-color:#0089ff;
            width:100%;
            border:0;
            outline:0;
            padding:5px 10px;
            cursor:pointer;
            font-size:15px;
            color:#fff;
            border-radius:4px;

            &:hover {
               background-color:#006fce;
            }

         }
      }
   }
}




`