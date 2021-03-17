
let webcam_output;
let poseNet;
let poses = [];

function setup() {

  createCanvas(640, 480);
  webcam_output = createCapture(VIDEO);
  webcam_output.size(width, height);

  poseNet = ml5.poseNet(webcam_output, modelReady);
  poseNet.on('pose', function(results) {
    poses = results;
  });
  webcam_output.hide();
}
function modelReady() {
  select('#status').html('Model Loaded');
}


function draw() {

  image(webcam_output, 0, 0, width, height);

  drawKeypoints();
  drawSkeleton();
}

function drawKeypoints(){

  for (let i = 0; i < poses.length; i++) {
    // For each pose detected, loop through all the keypoints
    let pose = poses[i].pose;
    for (let j = 0; j < pose.keypoints.length; j++) {
      // A keypoint is an object describing a body part (like rightArm or leftShoulder)
      let keypoint = pose.keypoints[j];
      // Only draw an ellipse if the pose probability is bigger than 0.2
      if (keypoint.score > 0.2) {
        // choosing colour. RGB where each colour ranges from 0 255
        fill(0, 0, 255);
        // disable drawing outline
        noStroke();
        
        ellipse(keypoint.position.x, keypoint.position.y, 10, 10);
      }
    }
  }
}

function drawSkeleton() {

  for (let i = 0; i < poses.length; i++) {
    let skeleton = poses[i].skeleton;
    // For every skeleton, loop through all body connections
    for (let j = 0; j < skeleton.length; j++) {
      // line start point
      let startPoint = skeleton[j][0];
      // line end point
      let endPoint = skeleton[j][1];
      // Sets the color used to draw lines and borders around shapes
      stroke(0, 255, 0);
      
      line(startPoint.position.x, startPoint.position.y, endPoint.position.x, endPoint.position.y);
    }
  }
}
