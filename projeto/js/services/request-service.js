import RequestException from "./exceptions/request-exceptions.js";

//função para fazer requisição e transforma a resposta em json
export async function getJson(url){
    try{
        const response = await fetch(url);
        const jsonBody = await response.json();
        return jsonBody;
    }
    catch(e){
        throw new RequestException("Erro ao realizar a requisição");
    }

}