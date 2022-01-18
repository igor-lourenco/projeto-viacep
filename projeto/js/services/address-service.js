import * as requestService from "./request-service.js";
import Address from "../models/address.js";

//função para montar a url e chamar a função que faz a requisição retornando um Address como resposta
export async function findByCep(cep){
    const url = `https://viacep.com.br/ws/${cep}/json`; // monta a url
    const result = await requestService.getJson(url);  // faz a requisição e retorna o body
    const address = new Address(result.cep, result.logradouro, null, result.localidade); // instancia 
    return address;
}

export function getErrors(address){
    const errors = {};

    if(!address.cep || address.cep == ""){
        errors.cep = "Campo Requerido";
    }
    if(!address.number || address.number == ""){
        errors.number = "Campo Requerido";
    }
    return errors;
}