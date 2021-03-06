let video
let posenet
let pose
let skeleton

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
  //console.log(poses)
  if(poses.length >0){
    pose = poses[0].pose
    skeleton = poses[0].skeleton
  }
}

function draw() {
  image(video,0,0)
  if (pose){
    
    let eyeR = pose.rightEye
    let eyeL = pose.leftEye
    let d = dist(eyeR.x,eyeR.y,eyeL.x,eyeL.y)
    fill(255,0,0)
    ellipse(pose.nose.x, pose.nose.y,d/1.2)
    
    fill(0,0,255)
    ellipse(pose.rightWrist.x,pose.rightWrist.y, 32)
    ellipse(pose.leftWrist.x, pose.leftWrist.y, 32)
    
    for (let i=0; i< pose.keypoints.length; i++){
      fill(0,255,0)
      ellipse(pose.keypoints[i].position.x, pose.keypoints[i].position.y,16,16)
    }
    
    for(let i=0; i <skeleton.length; i++){
      let a = skeleton[i][0]
      let b = skeleton[i][1]
      strokeWeight(2)
      stroke(255)
      line(a.position.x, a.position.y, b.position.x, b.position.y)
    }
  }
  
}