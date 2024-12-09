// Define all variables
var i = 0; // photo index
const floors = [1,3,2,2,2,1,1,1,1,3,3,3,1,3,1,1, 2, 2, 2, 2]; // Floors of each photo
const x = [157,202,388,102,256,552,552,552,300,611,572,615,370,385,584,129, 571, 99, 562, 511]; // x coord of each photo
const y = [351,360,338,262,277,399,399,399,352,144,132,157,377,351,194,342, 141, 227, 402, 307]; // y coord of each photo
const randomStarter = randomInt(0, floors.length);
var currentX;
var currentY;
var currentFloor;
var yCoord;
var points = 0;
const dotSize = 10;
var currentScreen = "guess";
var xScalar = 1;
var yScalar = 1;
let name;
var score = 0;

/*var audio = new Audio("Bury the Light - Vergil's battle theme from Devil May Cry 5 Special Edition.mp3 ");
audio.play();*/

function randomInt(min, max) { // min and max included 
  return Math.floor(Math.random() * (max - min + 1) + min)
}

addEventListener("resize", (event) => {

var ctx = document.getElementById("floor1").getContext("2d");
  ctx.canvas.style.maxWidth  = "100vh";
  ctx.canvas.style.maxHeight = "75vw";
  var size = ctx.canvas.getBoundingClientRect();
  //xScalar = size.width / 644;
  //yScalar =  size.height / 497;   Need to fix later!!!!!

  if (currentScreen = "guess") {
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(xCoord - dotSize / 2, yCoord - dotSize / 2, dotSize, dotSize);

  draw = true;
    
  }
  else {
    resultPage(i);
    
  }



  
});






// Function that changes the picture
function changePic()  {
  
  i++; 
  if (i == 1) {
    const changeButton = document.getElementById("changeButton")
    changeButton.textContent = "Make Guess";
    document.getElementById("photo").src = "static/photos/" + i +".jpg";
    name = document.getElementById("nameInput").value;
    document.getElementById("nameInput").remove();
  }
  else if (xCoord == undefined) {
    alert("Choose a guess!!");
    i--;
  }
  else {

  var max = 17;
  //i = Math.floor(Math.random() * 17);
  document.getElementById("photo").src = "static/photos/" + i +".jpg";
  console.log(i);
    if (i >= max) {
      
    }

  
  
  currentFloor = floors[i - 2];
  currentX = x[i - 2];
  currentY = y[i - 2];
  const offset = 50;
  var xCompare = (xCoord <= (offset + currentX)) && (xCoord >= (currentX - offset));
  var yCompare = (yCoord <= (offset + currentY)) && (yCoord >= (currentY - offset));
  var distance = Math.round(Math.sqrt(((currentX - xCoord) ** 2) + (currentY - yCoord) ** 2));
  var feet = distance / 2.16
  document.getElementById("distance").innerHTML = "Distance: " + +feet.toFixed(2) + " feet";
  score += distance;
  
  if ((xCompare && yCompare) && currentFloor == parseFloat(maps)) {
    alert("You got it right!");
  }
  else {
    
    alert("You were really off!");
    // parseFloat(maps) + xCompare + yCompare + i
    
  }

  
  if (i == max) {
    i = 1;
    
  }
  resultPage(i);
  }


}

  var dropdown = document.getElementById("maps");
  var map = document.getElementById("floor1");
  var image = document.getElementById("photo");
  var changeButton = document.getElementById("changeButton");
  var photoCanvas  = document.getElementById("photoCanvas");
  var distanceText = document.getElementById("distance");



function resultPage(i) {
  currentScreen = "result";
  dropdown = document.getElementById("maps");
  map = document.getElementById("floor1");
  image = document.getElementById("photo");
  changeButton = document.getElementById("changeButton");
  nextButton = document.getElementById("nextButton");
  distanceText = document.getElementById("distance");
  
  
  const photoCanvas  = document.getElementById("photoCanvas");
  const ctx = photoCanvas.getContext("2d");
  const canvasMap = new Image();
  
  
  dropdown.style.display = "none";
  image.style.display = "none";
  changeButton.style.display = "none";
  nextButton.style.display = "";
  photoCanvas.style.display = "";
  map.style.display = "none";
  distanceText.style.display = "";
  
  
  canvasMap.addEventListener(
  "load",
  () => {
    ctx.drawImage(canvasMap, 0, 0);

    ctx.beginPath();
    ctx.setLineDash([5, 5]);
    ctx.moveTo(xCoord, yCoord);
    ctx.lineTo(x[i - 2], y[i - 2]);
    ctx.stroke();
    
    ctx.fillStyle = "#FF0000";
    ctx.fillRect(xCoord - dotSize / 2, yCoord - dotSize / 2, dotSize, dotSize);
    ctx.fillStyle = "#00FF00";
    ctx.fillRect(x[i - 2] - dotSize / 2, y[i - 2] - dotSize / 2, dotSize, dotSize);
    
    if (currentFloor != parseFloat(maps)) {
      ctx.fillStyle = "#000000";
      ctx.font = "10px Arial";
      ctx.fillText("Floor " + parseFloat(maps), xCoord - 10, yCoord - 10);
      
      
    }
    
    
  },
  false
);
 canvasMap.src = "static/random/floor" + floors[i - 2] + "_new.jpg";
  if (currentFloor != parseFloat(maps)) {
    alert("The correct floor was Floor " + floors[i - 2]);
  }
 
  
  
} 

function nextImage() {
  currentScreen = "guess";
  dropdown = document.getElementById("maps");
  map = document.getElementById("floor1");
  image = document.getElementById("photo");
  changeButton = document.getElementById("changeButton");
  nextButton = document.getElementById("nextButton");
  photoCanvas  = document.getElementById("photoCanvas");
  distanceText = document.getElementById("distance");
  
  nextButton.style.display = "none";
  dropdown.style.display = "";
  image.style.display = "";
  changeButton.style.display = "";
  photoCanvas.style.display = "none";
  map.style.display = "";
  distanceText.style.display = "none";
  
  document.getElementById("maps").value = "1floor";
  floorSelect();

  
}

var draw = false;

function getCoords(event) {
  map = document.getElementById("floor1");
  xCoord = event.offsetX / xScalar;
  yCoord = event.offsetY / yScalar;

  var coords = "X coords: " + xCoord + ", Y coords: " + yCoord;
  document.getElementById("logo").innerHTML = coords + " Score " + score; 

  const mapCanvas  = document.getElementById("floor1");
  const ctx2 = mapCanvas.getContext("2d");
  
  
  if (draw) {
    ctx2.clearRect(0, 0, mapCanvas.width, mapCanvas.height);
    draw = false;
  }
    
    ctx2.fillStyle = "#FF0000";
    ctx2.fillRect(xCoord - dotSize / 2, yCoord - dotSize / 2, dotSize, dotSize);

  draw = true;
    


  
} 




var maps = "1floor";
function floorSelect() {
  map = document.getElementById("floor1");
  maps = document.getElementById("maps").value;


  
  var floor1 = document.getElementById('floor1');
  if (maps == "2floor") {
    map.style.backgroundImage = "url('static/random/floor2_new.jpg')";
  }
  else if (maps == "3floor") {
    map.style.backgroundImage = "url('static/random/floor3_new.jpg')";
  
  }
  
  else {
  map.style.backgroundImage = "url('static/random/floor1_new.jpg')";
  }
}