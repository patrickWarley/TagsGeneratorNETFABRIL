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
        let li = createLi();

        li.innerHTML = "<p>Nenhum endereço adicionado ainda!</p>";

        list.appendChild(li);
    }
}

function createItemList(item, index) {
    var html = `<span class="col-md-3">
                    Andar:${item.andar}
                </span>
                <span class="col-md-3">
                    Ruas : ${item.comecoRua}-${item.fimRua}
                </span>
                <span class="col-md-3">
                    Estantes : ${item.comecoEstante}-${item.fimEstante}
                </span>
                <span class="col-md-3">
                    Prateleiras : ${item.comecoPrateleiras}-${item.fimPrateleiras}
                </span>`;

    var li = createLi();

    var button = document.createElement("button");
    button.addEventListener("click", function(event){excluirAddress(event);});
    button.setAttribute("idaddress", index);

    var div = document.createElement("div");
    div.classList.add("list-group-horizontal");
    div.classList.add("row");
    div.innerHTML= html;

    div.appendChild(button);
    li.appendChild(div);

    return li;
}

function createLi(){
    var li = document.createElement("li");
    li.classList.add("list-group-item");
    return li;
}

export function resetList() {
    while (list.firstChild) list.removeChild(list.firstChild);
}
