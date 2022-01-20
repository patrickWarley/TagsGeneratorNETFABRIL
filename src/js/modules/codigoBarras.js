import { loadList, resetList, createElement } from "./list.js";

var link = "https://github.com/bwipp/postscriptbarcode/wiki/Text-Properties";

//encoder = the 128 ins't just a string this encoder is responsible for
//transform the string to the right format
const encoder = new Code128Generator();
const form = document.getElementById("myForm");

var addresses = [{
  andar:4,
  comecoRua:1,
  fimRua:1,
  comecoEstante:1,
  fimEstante:1,
  comecoPrateleiras:1,
  fimPrateleiras:1
},{
  andar:3,
  comecoRua:1,
  fimRua:1,
  comecoEstante:1,
  fimEstante:1,
  comecoPrateleiras:1,
  fimPrateleiras:1
},{
  andar:2,
  comecoRua:1,
  fimRua:5,
  comecoEstante:1,
  fimEstante:5,
  comecoPrateleiras:1,
  fimPrateleiras:5
}];

function init(){

  loadList(addresses);

  form.addEventListener("submit", function(event){
    event.preventDefault();
    addAddress();
  });

  var buttonReset = document.getElementById("resetListButton");
  buttonReset.addEventListener("click", function(){resetListAddress();});

  var buttonGerar = document.getElementById("gerarPagePrint");
  buttonGerar.addEventListener("click", generatePagePrint);
}

function generateTag(text){
  var textNode = document.createTextNode(encoder.encode(text));
  var text = document.createElement("span");
  text.appendChild(textNode);

  var newEtiqueta = document.createElement("td");
  newEtiqueta.classList.add("etiqueta");
  newEtiqueta.appendChild(text);

  return newEtiqueta;
}

function generateAddresses(address){

  var resultString = "A" + address.andar + ".";
  var resultado = [];

  let{comecoEstante,comecoPrateleiras, comecoRua,fimEstante, fimPrateleiras, fimRua} = address;

  for (var i = comecoRua; i <= fimRua; i++) {
    var estado1 = resultString;
    resultString += "R" + i + ".";

    for (var j = comecoEstante; j <= fimEstante; j++) {
      var estado2 = resultString;
      resultString += "E" + j + ".";

      for (var k = comecoPrateleiras; k <= fimPrateleiras; k++) {
        resultado.push(generateTag(resultString + "P" + k));
      }

      resultString = estado2;
    }

    resultString = estado1;
  }

  return resultado;
}

function addAddress(){
  var formData = new FormData(form);
  var address = Object.fromEntries(formData.entries());

  addresses.push(address);

  loadList(addresses);
}

function resetListAddress(){
  addresses = [];
  clearPagesPrint();
  resetList();
  loadList(addresses);
}

export function excluirAddress(event){
  var target = event.target;
  var id = target.getAttribute("idaddress");
  addresses.splice(id,1);  
  loadList(addresses);
}

function clearPagesPrint(){
  var cards = document.getElementsByClassName("pageCard");

  if(cards.length!=0)for(let i=cards.length-1; i>=0 ; i--)cards[i].remove();
};

function showPagePrint(page) {
  var divCol = createElement("","div","col-md-3", "pageCard");
  var divCard = createElement("","div", "card", "text-center", "marginCard");
  var divCarHeader = createElement("Imprimir", "div", "card-header");

  var iframe = document.createElement("iframe");

  var style = document.createElement("link");
  style.rel = "stylesheet";
  style.type = "text/css";
  style.href = "./src/css/codigoBarras.css";
  

  var link = document.createElement("link");
  var link2 = document.createElement("link");
  var link3 = document.createElement("link");

  link.rel = "preconnect";
  link.href = "https://fonts.googleapis.com";

  link2.rel = "preconnect";
  link2.href = "https://fonts.gstatic.com";

  link3.rel = "stylesheet";
  link3.href =
    "https://fonts.googleapis.com/css2?family=Libre+Barcode+128+Text&display=swap";
  
  //container
  var container = document. getElementById("containerPrint");

  divCard.appendChild(divCarHeader);
  divCard.appendChild(iframe);

  divCol.appendChild(divCard);
  container.appendChild(divCol);

  //add Iframe components
  iframe.contentDocument.body.appendChild(page);
  iframe.contentDocument.body.addEventListener("click", print);
  iframe.contentDocument.head.appendChild(style);
  iframe.contentDocument.body.appendChild(link);
  iframe.contentDocument.body.appendChild(link2);
  iframe.contentDocument.body.appendChild(link3);
}

function generatePagePrint(){
  
  //reset the list of pages
  clearPagesPrint();

  var arrTags = addresses.map( item => generateAddresses(item));

  //code the flatten or merge a array of arrays
  arrTags =[].concat.apply([], arrTags);

  for(let j=0; j<arrTags.length; j+=30){
    var aux = arrTags.slice(j,j+30);

    if(aux.length<30){
      for(let k=aux.length;k<30;k++){
        aux.push(generateTag(""));
      }
    }
    
    //now create the page
    var page = createElement("","table","result");

    //generate the rows of the page
    for(let i=0; i<30; i+=3){
      var row = document.createElement("tr");

      row.appendChild(aux[i]);
      row.appendChild(aux[i+1]);
      row.appendChild(aux[i+2]);

      page.appendChild(row);
    }

    showPagePrint(page);
  }
}

function print(event) {
  var target = event.target;
  var frame = target.ownerDocument;
  frame.defaultView.focus();
  frame.defaultView.print();
}

init();