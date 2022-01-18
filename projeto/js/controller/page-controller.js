import * as modalController from './modal-controller.js';

export function init(){
    const contactLink = document.querySelector(".contact-link");
    contactLink.addEventListener('click', hadleContactLinkClick)

    console.log("Page controller Iniciado");
}

function hadleContactLinkClick(event){
    event.preventDefault();
    modalController.showModal();
}