let poseNet;
let video;
 //setting certain bodypart values to 0
let noseX = 0;
let noseY= 0;
let eyerX= 0; //right eye
let eyerY= 0;

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO); //sets the camera up but doesnt' show it yet that happens in the draw function
  video.hide();// without this their will be 2 displays of the video
  poseNet = ml5.poseNet(video, modelReady); // checks if the cloud server is ready for poses
  poseNet.on('pose', gotPoses);
}

function modelReady(){
  console.log('model ready'); //lets yk in the console if the cloud server is ready for poses
  select('#status').html('Model Loaded'); //lets yk on the web page if model is loaded 
}

function draw() {
  image(video,0,0);
  
  let d = dist(noseX, noseY, eyerX, eyerY); //makes stay rationed in the Z direction
   //dist calculates the distance between the values u input using this equation d=√((x_2-x_1)²+(y_2-y_1)²)
  console.log(d);
  //making the filter will make it into buttons so will have to use document .getlelement stuff and inside functions,
  //and withing them if then statements within them
  
  //the filter 
  fill(255,0,0); 
  ellipse(noseX, noseY, d); //(x,y,width) nose :)
  fill(0,0,255);
  ellipse(eyerX,eyerY, d); // right eye:)
}

function gotPoses(poses){
  if (poses.length > 0) {
   //person 1 (aka 0 cuz its programming)-> the pose of that person-> and within that which body part-> position of the body part -> and then we want the x or y value
    let nX = poses[0].pose.keypoints[0].position.x; 
    let nY = poses[0].pose.keypoints[0].position.y;
    let eX = poses[0].pose.keypoints[1].position.x;
    let eY = poses[0].pose.keypoints[1].position.y;
    noseX = lerp(noseX, nX, 0.5);
    noseY = lerp(noseY, nY, 0.5);
    eyerX = lerp(eyerX, eX, 0.5);
    eyerY = lerp(eyerY, eY, 0.5);
  }
}
  
