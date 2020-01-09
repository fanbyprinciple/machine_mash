let video
var pose

function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO)
  video.hide()
  poseNet = ml5.poseNet(video, modelLoaded)
  poseNet.on('pose', gotPoses)
  
}

function modelLoaded(){
  console.log('model ready')
}

function gotPoses(poses){
  console.log(poses)
  if(poses.length >0){
  pose = poses[0].pose
  }
}

function draw() {
  image(video,0,0)
  if (pose){
    
    let eyeR = pose.rightEye
    let eyeL = pose.leftEye
    let d = dist(eyeR.x,eyeR.y,eyeL.x,eyeL.y)
    fill(255,0,0)
    ellipse(pose.nose.x, pose.nose.y,d)
  }
  
}