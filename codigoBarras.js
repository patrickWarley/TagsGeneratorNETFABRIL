var link = "https://github.com/bwipp/postscriptbarcode/wiki/Text-Properties";

//encoder = the 128 ins't just a string this encoder is responsible for
//transform the string to the right format
const encoder = new Code128Generator();


function generateTag(text){
  var textNode = document.createTextNode(encoder.encode(tags[i]));
  var text = document.createElement("span");
  text.appendChild(textNode);

  var newEtiqueta = document.createElement("td");
  newEtiqueta.classList.add("etiqueta");
  newEtiqueta.appendChild(text);

  return newEtiqueta;
}

function generateAddresses(range){

  var resultString = "A" + andar + ".";
  for (var i = rua[0]; i <= rua[1]; i++) {
    var estado1 = resultString;
    resultString += "R" + i + ".";

    for (var j = estante[0]; j <= estante[1]; j++) {
      var estado2 = resultString;
      resultString += "E" + j + ".";

      for (var k = prateleira[0]; k <= prateleira[1]; k++) {
        resultado.push(generateTag(resultString + "P" + k));
      }

      resultString = estado2;
    }

    resultString = estado1;
  }

  return resultado;
}


function criarCodigo(){

  //var andar = prompt("Qual andar?");
  //var intervaloRuas = prompt("Intervalo ruas: começo-fim");
  //var intervaloEstantes = prompt("Intervalo estantes: começo-fim");
  //var intervaloPrateleiras = prompt("Invalor prateleiras: começo-fim");

  var andar = 3;
  var intervaloRuas = "5-5";
  var intervaloEstantes = "1-8";
  var intervaloPrateleiras = "1-7";
  
  var resultado = [];

  var rua = intervaloRuas.split("-");
  var estante = intervaloEstantes.split("-");
  var prateleira = intervaloPrateleiras.split("-");

  var range =0  ; //How I'm going to pass the info 

  //code to create the tags
  var tags = generateAddresses(range);

  var result = document.createElement("table");
  result.classList.add("result");

  var row = document.createElement("tr");
  
  //find the nearest multiple of 30
  let mod30 = resultado.length%30;
  let nearest30multiple = resultado.length+(30-mod30);

  for (var i = 0; i < nearest30multiple; i++) {
    var tag;

    if(resultado[i]){
      tag = resultado[i];
    }else{
      tag = generateTag(1);
    }

    row.appendChild(tag);

    if ((i + 1) % 30 == 0) {
      //append the row
      result.appendChild(row);

      //create one new
      row = document.createElement("tr");

      //append the table
      document.body.appendChild(result);

      //create the page to print
      createPagePrint(result, i);

      //restart
      result = document.createElement("table");
      result.classList.add("result");
    }

    //here I'm just filling the row
    //if we are in a multiple of 30 don't add the row because we already did above
    if ((i + 1) % 3 == 0 && (i + 1) % 30 !== 0) {
      result.appendChild(row);
      row = document.createElement("tr");
    }
  }

}



function createPagePrint(table, tableid) {
  var iframe = document.createElement("iframe");
  iframe.name = tableid;
  iframe.id = tableid;

  var style = document.createElement("link");
  style.rel = "stylesheet";
  style.type = "text/css";
  style.href = "./codigoBarras.css";
  

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
  
  document.body.appendChild(iframe);
  iframe.contentDocument.body.appendChild(table);
  iframe.contentDocument.body.addEventListener("click", print);
  iframe.contentDocument.head.appendChild(style);
  iframe.contentDocument.body.appendChild(link);
  iframe.contentDocument.body.appendChild(link2);
  iframe.contentDocument.body.appendChild(link3);
}

function print(event) {
  var target = event.target;
  var frame = target.ownerDocument;
  frame.defaultView.focus();
  frame.defaultView.print();
}

criarCodigo();

 