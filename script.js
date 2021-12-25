$(document).ready(function() {
    $("img").on("click", function(event) {
        var iw=this.naturalWidth;
        var ih=this.naturalHeight;
        var realWidth = this.width;
        var realHeight = this.height;

        var x = event.pageX - this.offsetLeft - realWidth/2;
        var y = event.pageY - this.offsetTop - realHeight/2;
        alert("X Coordinate: " + x + " Y Coordinate: " + y + " naturalWidth: " + iw + " naturalHeight: " + ih);
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
    });
});

const remove = document.getElementById('Clear-btn');
const place = document.getElementById('place')

remove.addEventListener('click', (event) => {
  console.log(place.childNodes.length);
  if (place.childNodes.length > 1) {
    place.removeChild(place.lastChild)
    place.removeChild(place.lastChild)
  }
});
