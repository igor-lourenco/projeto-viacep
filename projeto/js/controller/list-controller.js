function State(){
    this.listSection = null;
}

const state = new State();

export function init(){
    state.listSection = document.querySelector("#list-section"); // pra pegar a section pelo id para criar div dentro dela
}

export function addCard(address){
    const card = createCard(address); //cria o card
    state.listSection.appendChild(card);  //adiciona 
}

function createCard(address){
    const div = document.createElement("div"); //cria uma div
    div.classList.add("card-list-item"); //adiciona uma classe na div criada

    const h3 = document.createElement("h3");  //cria um h3
    h3.innerHTML = address.city;    //adiciona a city do tipo address no campo 
    
    const line = document.createElement("p");  //cria um p
    line.classList.add("address-line");
    line.innerHTML = `${address.street}, ${address.number}`;

    const cep = document.createElement("p"); 
    cep.classList.add("address-cep");
    cep.innerHTML = address.cep;

    div.appendChild(h3);  //adiciona o h3 na div criada
    div.appendChild(line);
    div.appendChild(cep);

    return div;
}