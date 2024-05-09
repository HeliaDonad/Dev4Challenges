let objectDetector;
let video;
let objects = [];
let modelLoaded = false;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO, () => {
    video.size(640, 480);
    objectDetector = ml5.objectDetector('cocossd', modelReady);
  });
  document.getElementById('snapshot-btn').addEventListener('click', takeSnapshot);
}

function modelReady() {
  modelLoaded = true;
  document.querySelector("#model-feedback").style.visibility = "hidden";
}

function takeSnapshot() {
  image(video, 0, 0, width, height);
  objectDetector.detect(canvas, gotResult);
}

function gotResult(err, results) {
  if (err) {
    console.error(err);
    return;
  }
  objects = results;
  displayObjects();
}

function displayObjects() {
  for (let i = 0; i < objects.length; i++) {
    if (objects[i].confidence > 0.5) {
      for (let i = 0; i < objects.length; i++) {
        if (objects[i].confidence > 0.5) {
          noStroke();
          fill(0, 208, 133);
          // textSize(8);
          text(objects[i].label + " " + nfc(objects[i].confidence * 100.0, 2) + "%", objects[i].x + 8, objects[i].y + 12);
          noFill();
          strokeWeight(4);
          stroke(0, 208, 133);
          rect(objects[i].x, objects[i].y, objects[i].width, objects[i].height);
        }
      }
    }
  }
}
