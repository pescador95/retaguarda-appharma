import env from "react-dotenv";
console.log('api: '+env.API_URL+' URLFILE: '+env.URL_FILES)
export default {
   API_URL: env.API_URL,
   URL_FILES:env.URL_FILES,
   CORPRINCIPAL: env.CORPRINCIPAL,
}