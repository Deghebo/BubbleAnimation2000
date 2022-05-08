// console.log("test");

var canvas = document.getElementById("myCanvas");
//var canvas = document.querrySelector("canvas");

var c = canvas.getContext('2d');

canvas.width = window.innerWidth;
canvas.height = window.innerHeight;

var w = canvas.width;
var h = canvas.height;

var initBubbles = 50;
var minBubbles = 10;
// array for all bubbles
var bubbles = [];

// event listener
window.addEventListener("load", init);

function init() {
  // fill the bubbles array with Bubble objects
  while (bubbles.length < initBubbles) {
    bubbles.push(createBubble());
  }
  //console.log(bubbles);
  draw();
}

// test the bubble
var b = new Bubble(100, 100, 20, -2);
// b.draw();

// constructor for the bubble object
function Bubble(x, y, r, vx, vy) {
  this.x = x;
  this.y = y;
  this.r = r;
  this.vx = vx;
  this.vy = vy;
  this.color = "Blue";
  this.draw = function () {
    // draw bubble
    c.beginPath();
    c.fillStyle = this.color;
    c.arc(this.x, this.y, this.r, 0, 2 * Math.PI, false);
    c.fill();
    c.closePath();
    // draw shine dot
    c.beginPath();
    c.fillStyle = "LightBlue"
    c.arc(this.x - (r / 3), this.y - (r / 3), this.r / 3, 0, 2 * Math.PI, false);
    c.fill();
    c.closePath();

  }
}

function createBubble() {
  var r = Math.floor(Math.random() * 31) + 10; //10 to 40
  var x = Math.random() * w;
  var y = Math.random() * h;
  // velocity variables
  var vx = (Math.random() * 4) - 2; // -2 to 2
  var vy = -(Math.random() * 3) - 1; // -2 to 2

  // create a bubble
  return new Bubble(x, y, r, vx, vy);
}

function draw() {
  // paint background
  c.fillStyle = "Black";
  c.fillRect(0, 0, w, h);

  // loop through the array and draw bubbles 
  for (var i = 0; i < bubbles.length; i++) {
    var currentBubble = bubbles[i];

    // update the position
    currentBubble.x += currentBubble.vx;
    currentBubble.y += currentBubble.vy;
    currentBubble.draw();
    // remove bubbles
    if (currentBubble.x > w || currentBubble.x < 0 || currentBubble.y < 10) {
      bubbles.splice(i, 1);
      // add a bubble if array gets too small
      if (bubbles.length <= minBubbles) {
        bubbles.splice(i, 0, createBubble());
      }
    }
  }

  // loop
  requestAnimationFrame(draw);

}




