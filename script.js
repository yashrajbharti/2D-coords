var realWidth = 0;
var realHeight = 0;
$(document).ready(function() {
    $("img").on("click", function(event) {
        var iw=this.naturalWidth;
        var ih=this.naturalHeight;
        realWidth = this.width;
        realHeight = this.height;

        var x = event.pageX - this.offsetLeft - realWidth/2;
        var y = event.pageY - this.offsetTop - realHeight/2;
        //alert("X Coordinate: " + x + " Y Coordinate: " + -y + " realWidth: " + realWidth + " realHeight: " + realHeight);
        var a = x - 8;
        var b = y + realHeight/2 - 14;
        var span = document.createElement("SPAN");
        span.classList.add("dot");
        document.getElementById("place").appendChild(span);
        span.style.transform = "translate(" + a+ "px," + b+ "px)";

        var p = document.createElement("P");
        p.classList.add("text");
        document.getElementById("place").appendChild(p);
        p.innerText = 'New Text';
        p.style.transform = "translate(" + a+ "px," + b+ "px)";
        p.contentEditable = true;
        console.log(x/realWidth *2) // normalized width coords
        console.log((27 - y)/ realHeight *2) // normalized height coords
    });
});

const remove = document.getElementById('Clear-btn');
const place = document.getElementById('place')

remove.addEventListener('click', (event) => { // DELETE ANNOTATION
  if (place.childNodes.length > 1) {
    place.removeChild(place.lastChild)
    place.removeChild(place.lastChild)
  }
});

const next = document.getElementById('next');
next.addEventListener('click', (event) => { // SAVE ANNOTATION

  var lengthAll = (place.childNodes.length -1) /2;
  let arrowCoords = new Array(lengthAll); // columns
  for (let i = 0; i < lengthAll; i++) {
    arrowCoords[i] = new Array(2); // rows
  }
  let textValue = new Array(lengthAll);
  let realH = realHeight;
  let realW = realWidth;

for (let i = 0; i < lengthAll; i++) {

  let matrex = window.getComputedStyle(place.children[2*i]).getPropertyValue("transform");
  let matrexArr = matrex.split(", ");
  let translateXNum = parseInt(matrexArr[4]);
  let translateYNum = parseInt(matrexArr[5]);

  arrowCoords[i][0] = translateXNum + 8;
  arrowCoords[i][1] = (translateYNum + 14 - realH/2) * -1;

  textValue[i] =  place.children[2*i+1].innerText;
}
console.log(arrowCoords, textValue, realW, realH)
const data ={
  "arrowCoords" : arrowCoords,
  "textValue" : textValue,
  "realW" : realW,
  "realH" : realH
}

  let headers = new Headers();
  headers.append("Content-Type", "application/json");


  let requestOptions = {
    method: 'POST',
    headers: headers,
    body: JSON.stringify(data),
    redirect: 'follow'
  };

  fetch("https://artest.supportgenie.io/codata", requestOptions)
.then(response => response.text())
.then(result => {location.href = ""})
.catch(error => console.log('error', error));

});
