const { LibManifestPlugin } = require("webpack");

function setup() {
  createCanvas(400, 400); 
  angleMode(RADIANS);
  frameRate(10);
}

function drawStem() {
  noFill();
  origin_x = 170;
  origin_y = 360;
  ctrl_x1 = origin_x - 20
  ctrl_y1 = origin_y - 40
  ctrl_x2 = origin_x + 50
  ctrl_y2 = origin_y - 220
  end_x = origin_x + 20;
  end_y = origin_y - 300;

  stroke(0)
  strokeWeight(1)
  //line(origin_x, origin_y, ctrl_x1, ctrl_y1)
  //line(ctrl_x2, ctrl_y2, end_x, end_y)

  stroke('rgba(77,182,96, 0.8)')
  strokeWeight(4);
  bezier(origin_x, origin_y, ctrl_x1, ctrl_y1, ctrl_x2, ctrl_y2, end_x, end_y);

  fill(255);
  strokeWeight(1);
  let numLeaves = 20;
  leafStartPercentage = 0.5;
  for (let i = 0; i <= numLeaves; i++) {
    let t = (1 - leafStartPercentage) * (i / numLeaves) + leafStartPercentage;
    let x = bezierPoint(origin_x, ctrl_x1, ctrl_x2, end_x, t);
    let y = bezierPoint(origin_y, ctrl_y1, ctrl_y2, end_y, t);
    //circle(x, y, 5);

    tx = bezierTangent(origin_x, ctrl_x1, ctrl_x2, end_x, t);
    ty = bezierTangent(origin_y, ctrl_y1, ctrl_y2, end_y, t);
    angle = atan2(ty, tx);
    angle += HALF_PI;

    //stroke(1)
    //line(x, y, cos(angle) * 80 + x, sin(angle) * 80 + y);
    leafWidth1 = 20;
    leafWidth2 = 20;
    bezier(0,0,20,leafWidth1,80,leafWidth2,100,0);
    t = i / numLeaves;
    let leafLength = 0.04*bezierPoint(10, leafWidth1, leafWidth2, 5, t);

    push();
    translate(x,y);
    leafBendAngle = 30
    rotate(angle - radians(leafBendAngle));
    drawLeaf(leafLength);
    rotate(PI + radians(leafBendAngle));
    drawLeaf(leafLength);
    pop();
  }
}

function drawLeaf(leafLength) {
  noStroke();
  fill('rgba(46,114,59, 0.8)');
  beginShape();
  vertex(0,0);
  quadraticVertex(50*leafLength,-5,100*leafLength,0);
  quadraticVertex(50*leafLength,5,0,0);
  endShape(CLOSE);
}

function draw() {
  background('white');
  fill(255, 60, 100);
  text("(" + mouseX + ", " + mouseY + ")", mouseX, mouseY);
  stroke(0);
  noFill();

  drawStem()
  leafBoundary()
}
