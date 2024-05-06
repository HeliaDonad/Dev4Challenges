let handpose;
let video;
let predictions = [];
let modelLoaded = false;
let bubbles = [];

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.size(width, height);

  handpose = ml5.handpose(video, modelReady);

  handpose.on("predict", results => {
    predictions = results;
  });

  video.hide();

  // Afbeelding laden en bubbels initialiseren
  loadImage('images/bubble.png', img => {
    for (let i = 0; i < 3; i++) {
      let x = random(width);
      let y = random(height);
      let size = random(20, 50); // Willekeurige grootte tussen 20 en 50
      bubbles.push(new Bubble(x, y, size, img));
    }
  });
}

function modelReady() {
  console.log("Model ready!");
  modelLoaded = true;
}

function draw() {
  frameRate(30);
  if (modelLoaded) {
    image(video, 0, 0, width, height);
    drawFingers();
    updateBubbles();
    drawBubbles();
    checkBubblePop();
  }
}

function drawKeypoints() {
  for (let i = 0; i < predictions.length; i += 1) {
    const prediction = predictions[i];
    for (let j = 0; j < prediction.landmarks.length; j += 1) {
      const keypoint = prediction.landmarks[j];
      fill(0, 255, 0);
      noStroke();
      ellipse(keypoint[0], keypoint[1], 10, 10);
    }
  }
}

function drawFingers() {
  console.log(predictions);
  push();
  rectMode(CORNERS);
  noStroke();
  fill(255, 0, 0);
  if (predictions[0] && predictions[0].hasOwnProperty('annotations')) {
    let index1 = predictions[0].annotations.indexFinger[0];
    let index2 = predictions[0].annotations.indexFinger[1];
    let index3 = predictions[0].annotations.indexFinger[2];
    let index4 = predictions[0].annotations.indexFinger[3];
    circle(index4[0], index4[1], 10);// index4[2]);
  }
  pop();
}

function updateBubbles() {
  for (let i = bubbles.length - 1; i >= 0; i--) {
    bubbles[i].move();
  }
}

function drawBubbles() {
  for (let i = 0; i < bubbles.length; i++) {
    bubbles[i].display();
  }
}

function checkBubblePop() {
  if (predictions.length > 0) {
    let indexFinger = predictions[0].annotations.indexFinger[3];
    for (let i = bubbles.length - 1; i >= 0; i--) {
      let d = dist(indexFinger[0], indexFinger[1], bubbles[i].x, bubbles[i].y);
      if (d < bubbles[i].size / 2) { // Check if finger is inside the bubble
        bubbles.splice(i, 1);
      }
    }
  }
}

class Bubble {
  constructor(x, y, size, img) {
    this.x = x;
    this.y = y;
    this.size = size;
    this.img = img;
  }

  move() {
    // Bubbels kunnen worden verplaatst als dat nodig is
  }

  display() {
    image(this.img, this.x - this.size / 2, this.y - this.size / 2, this.size, this.size);
  }
}
