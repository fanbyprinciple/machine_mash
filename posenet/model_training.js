// ml5.js: Pose Estimation with PoseNet
// The Coding Train / Daniel Shiffman
// https://thecodingtrain.com/Courses/ml5-beginners-guide/7.1-posenet.html
// https://youtu.be/OIo-DIOkNVg
// https://editor.p5js.org/codingtrain/sketches/ULA97pJXR

let video;
let poseNet;
let pose;
let skeleton;

let state = 'waiting'
let targetLabel 

let poseLabel = 'c'

let brain

function keyPressed(){
  
  if (key == 's'){
    brain.saveData()
  } else {
    targetLabel = key
    console.log('collecting')
    setTimeout(function(){
      state = 'collecting'
      setTimeout(function(){
        console.log('not collecting')
        state = 'waiting'
      }, 10000)
    }, 3000)
  }
    
}



function setup() {
  createCanvas(640, 480);
  video = createCapture(VIDEO);
  video.hide();
  poseNet = ml5.poseNet(video, modelLoaded);
  poseNet.on('pose', gotPoses);
  
  let options = {
    inputs : 34,
    outputs : 4,
    task: 'classification',
    debug: true
  }
  
  brain = ml5.neuralNetwork(options)
  const modelInfo = {
    model: 'model.json',
    metadata: 'model_meta.json',
    weights: 'model.weights.bin'
  }
  
  //brain.load(modelInfo, brainReady)
  //brain.loadData('open_close.json', dataReady)
}

function brainReady(){
  console.log("neural network ready !")
  classifyPose()
  
}

function gotResult(error, results){
  poseLabel = results[0].label
  //console.log(results[0].label)
  classifyPose()
}

function classifyPose(){
  if (pose){
    let inputs = []
    for (let i=0; i < pose.keypoints.length; i++){
      let x = pose.keypoints[i].position.x
      let y = pose.keypoints[i].position.y
      inputs.push(x)
      inputs.push(y)
    }
    
    brain.classify(inputs, gotResult)
  } else {
    setTimeout(classifyPose, 100)
  }
}

// function dataReady(){
//   brain.normalizeData()
//   brain.train({epochs: 50}, finished)
//   brain.save()
// }

function finished(){
  console.log('model trained')
  brain.save()
}
function gotPoses(poses) {
  //console.log(poses); 
  if (poses.length > 0) {
    pose = poses[0].pose;
    skeleton = poses[0].skeleton;
    
    if(state == 'collecting'){
      
      let inputs = []
      for( let i=0; i<pose.keypoints.length; i++){
        let x = pose.keypoints[i].position.x
        let y = pose.keypoints[i].position.y
        inputs.push(x)
        inputs.push(y)
      }
    
      let target = [targetLabel]
    
      brain.addData(inputs, target)
    }
    
  }
}


function modelLoaded() {
  console.log('poseNet ready');
}

function draw() {
  image(video, 0, 0);

  if (pose) {
//     let eyeR = pose.rightEye;
//     let eyeL = pose.leftEye;
//     let d = dist(eyeR.x, eyeR.y, eyeL.x, eyeL.y);
//     fill(255, 0, 0);
//     ellipse(pose.nose.x, pose.nose.y, d);
//     fill(0, 0, 255);
//     ellipse(pose.rightWrist.x, pose.rightWrist.y, 32);
//     ellipse(pose.leftWrist.x, pose.leftWrist.y, 32);
    
    for (let i = 0; i < pose.keypoints.length; i++) {
      let x = pose.keypoints[i].position.x;
      let y = pose.keypoints[i].position.y;
      fill(0,255,0);
      ellipse(x,y,16,16);
    }
    
    for (let i = 0; i < skeleton.length; i++) {
      let a = skeleton[i][0];
      let b = skeleton[i][1];
      strokeWeight(2);
      stroke(255);
      line(a.position.x, a.position.y,b.position.x,b.position.y);      
    }
    
//     fill(255,0,255)
//     noStroke()
//     textSize(512)
//     textAlign(CENTER, CENTER)
//     text(poseLabel, width/2, height/2)
    
  }
}