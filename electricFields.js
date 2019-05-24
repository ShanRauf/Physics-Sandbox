var arr = [];
function setup() {
  createCanvas(displayWidth,displayHeight);
  for(var i=0; i<50; i++){
    for(var j=0; j<50; j++){
      arr.push(new Arrow(30*i,30*j,2));
    }
  }
}

function draw() {
  background(255);
  fill(0,100,255);
  for(var i=0; i < arr.length; i++){
      arr[i].update();
}
}
function Arrow(x,y,length){
  this.x=x;
  this.y=y;
  this.length = length;
  this.update = function() {
  var angle = atan2(mouseY-y, mouseX-x);
  push();
  translate(this.x,this.y);
  rotate(angle);
  
  beginShape()
    noStroke();
  vertex(0,-this.length);
  vertex(5*this.length, -this.length);
  vertex(5*this.length, -3*this.length);
  vertex(9*this.length, 0);
  vertex(5*this.length, 3*this.length);
  vertex(5*this.length, this.length);
  vertex(0,this.length);
  endShape(CLOSE);
  pop();
  }
}
function touchMoved(){
//drag finger
  return false;
  
}
// https://editor.p5js.org/projects/rkLhgyYp