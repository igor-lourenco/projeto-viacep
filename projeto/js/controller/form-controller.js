/* Responsável por controlar o formulario */
import Address from "../models/address.js";
import * as addressService from "../services/address-service.js";
import * as listController from './list-controller.js';

const state = new State();

function State() {
    this.address = new Address();
    this.btnSave = null;
    this.btnClear = null;
    this.inputCep = null;
    this.street = null;
    this.inputNumber = null;
    this.inputCity = null;
    this.errorCep = null;
    this.errorNumber = null;
}

export function init() {
    state.inputCep = document.forms.newAddress.cep;
    state.inputStreet = document.forms.newAddress.street;
    state.inputNumber = document.forms.newAddress.number;
    state.inputCity = document.forms.newAddress.city;

    state.btnSave = document.forms.newAddress.btnSave;
    state.btnClear = document.forms.newAddress.btnClear;

    state.errorCep = document.querySelector('[data-error="cep"]');
    state.errorNumber = document.querySelector('[data-error="number"]');

    //serve pra disparar um evento quando o usuario modificar o valor para vazio e clicar fora do input
    state.inputNumber.addEventListener('change', handleInputNumberChange);

    //serve pra limpar o formulário quando o botão clear for clicado 
    state.btnClear.addEventListener('click', handlerBtnClearClick);
    state.btnSave.addEventListener('click', handlerBtnSaveClick);
    state.inputCep.addEventListener('change', handleInputCepChange);
    state.inputNumber.addEventListener('keyup', handleInputNumberKeyup);

}

//função para pegar o numero digitado no input
function handleInputNumberKeyup(event) {
    state.address.number = event.target.value;
}

//funcao para chamar o metodo passando o cep e retornando o address e preenchendo os inputs
async function handleInputCepChange(event) {
    try {
        const cep = event.target.value;
        const address = await addressService.findByCep(cep);
        state.inputCity.value = address.city;
        state.inputStreet.value = address.street;
        state.address = address;
        setFormError("cep", "");
        state.inputNumber.focus();
    } catch (e) {
        setFormError("cep", "informe um cep válido");
    }
}

//funcao para salvar os dados
function handlerBtnSaveClick(event) {
    event.preventDefault();
    const errors = addressService.getErrors(state.address);
    const keys = Object.keys(errors);  //retorna um array com os campos que deram erro
    if (keys.length > 0) {
        keys.forEach(key => {
            setFormError(key, errors[key]);
        });

    } else {
        listController.addCard(state.address);
        clearForm();
    }
}

//função para disparar um evento quando o valor do inputNumber foi modificado 
function handleInputNumberChange(event) {
    if (event.target.value == "") {
        setFormError("number", "Campo requerido")
    } else {
        state.inputStreet.value = "";
        state.inputCity.value = "";
        setFormError("number", "")
    }
}

//função para disparar um evento quando o botao limpar for clicado
function handlerBtnClearClick(event) {
    event.preventDefault();  //pro formulário não ser enviado e não chamar outra página
    clearForm();

}

// função para escrever a mensagem de campo requerido no formulario
function setFormError(key, value) {
    const element = document.querySelector(`[data-error="${key}"]`);
    element.innerHTML = value;
}

//funcao para limpar os campos do formulario
function clearForm() {
    state.inputCep.value = "";
    state.inputStreet.value = "";
    state.inputNumber.value = "";
    state.inputCity.value = "";

    setFormError("cep", "");
    setFormError("number", "");

    state.address = new Address();

    state.inputCep.focus(); // pro cursor focar no input do cep
}