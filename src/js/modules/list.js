import { excluirAddress } from "./codigoBarras.js";

var list = {};

export function loadList(addresses) {
    list = document.getElementById('list');
    resetList();

    if (addresses.length !==0) {
        //remove all children from the list    
        addresses.forEach(function (item, index) {
            list.appendChild(createItemList(item, index));
        });
    } else {
        let li = createElement("Nenhum endereço adicionado ainda!", "li", "list-group-item");
        list.appendChild(li);
    }
}

function createItemList(item, index) {

    var li = createElement("", "li", "list-group-item");

    var div = createElement("","div", "list-group-horizontal", "row");

    var remove = createElement("","span", "bi","bi-x-square-fill");
    remove.addEventListener("click", function(event){excluirAddress(event);});
    remove.setAttribute("idaddress", index);

    var controlsDiv = createElement("", "div", "col-md-3");
    var textDivWrapper =  createElement("", "div", "col-md-9")
    var textDiv = createElement("", "div", "row");

    textDiv.appendChild(createElement(`Andar:${item.andar}`, "span","col-md-3"));
    textDiv.appendChild(createElement(`Ruas : ${item.comecoRua}-${item.fimRua}`, "span", "col-md-3"));
    textDiv.appendChild(createElement(`Estantes : ${item.comecoEstante}-${item.fimEstante}`, "span", "col-md-3"));
    textDiv.appendChild(createElement(`Prateleiras : ${item.comecoPrateleiras}-${item.fimPrateleiras}`,"span", "col-md-3"));

    //add controls
    controlsDiv.id="controls";
    controlsDiv.appendChild(remove);

    textDivWrapper.appendChild(textDiv);
    
    div.appendChild(textDivWrapper);
    div.appendChild(controlsDiv);
    
    li.appendChild(div);

    return li;
}


export function createElement(innerHTML, element, ...className){
    var element = document.createElement(element);
    element.innerHTML =  innerHTML;

    if(className.length !==0)className.forEach(cssClass => element.classList.add(cssClass));

    return element;
}

export function resetList() {
    while (list.firstChild) list.removeChild(list.firstChild);
}
