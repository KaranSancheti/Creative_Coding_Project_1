class Ring {
  constructor(size, col) {
    this.size = size;
    this.mass = 5 * size ^ 2;
    this.color = col;
    this.x = width / 2;
    this.y = height / 2;
    this.vx = 0;
    this.vy = 0;
  }

  target(targetX, targetY) {
    let Dx = targetX - this.x;
    let Dy = targetY - this.y;
    this.vx += Dx / this.mass;
    this.vy += Dy / this.mass;
  }

  update() {
    this.vx *= 0.5;
    this.vy *= 1;
    this.x += this.vx;
    this.y += this.vy;
  }

  draw() {
    noFill();
    strokeWeight(1);
    line(this.x, this.y, 10, 10);
    line(this.x, this.y, 700, 10);
    //line(this.x, this.y, 10, 600);
    //line(this.x, this.y, 700, 600);
    stroke(this.color);
    strokeWeight(30);
    ellipse(this.x, this.y, this.size / 1.5);
  }
}


var rings = [];
var timeWithoutMovement = 1;



function setup() {
  createCanvas(windowWidth, windowHeight);
  colorMode(HSB);
  for (let i = 0; i < height + 20; i += 25) {
    rings.push(new Ring(i, color(220 * i / height, 180, 50)));
  }
}

function draw() {
  timeWithoutMovement++;
  background(0);
  for (let i = 0; i < rings.length; i++) {
    if (i != 0) rings[i].target(rings[i - 1].x, rings[i - 1].y);
    if (i != rings.length - 1) rings[i].target(rings[i + 1].x, rings[i + 1].y);
  }
  if (timeWithoutMovement > 120) {
    rings[rings.length - 1].target(
      width / 2 + width / 3 * cos(timeWithoutMovement),
      height / 2 + height / 3 * sin(timeWithoutMovement));

  } else {
    rings[rings.length - 1].target(mouseX, mouseY);
  }
  for (let i = 0; i < rings.length; i++) {
    rings[i].update();
    rings[i].draw();
  }
}

function mouseMoved() {
  timeWithoutMovement = 0;
}