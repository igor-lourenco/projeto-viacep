import * as requestService from "./request-service.js";
import Address from "../models/address.js";

export async function findByCep(cep){
    const url = `https://viacep.com.br/ws/${cep}/json`; // monta a url
    const result = await requestService.getJson(url);  // faz a requisição e retorna o body
    const address = new Address(result.cep, result.logradouro, null, result.localidade); // instancia 
    return address;
}