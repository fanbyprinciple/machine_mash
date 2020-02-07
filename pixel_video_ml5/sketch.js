let video;
let videoSize = 10;
let ready =false
//let slider

let pixelBrain
let label =''

function setup() {
  createCanvas(400, 400);
  // slider = createSlider(10,100,1)
  // slider.position(10, 10);
  // slider.style('width', '80px');
  
  
  video = createCapture(VIDEO, videoReady)
  video.size(videoSize,videoSize)
  video.hide()
  
  let options = {
    inputs : videoSize * videoSize * 3,
    outputs: 2,
    task: 'classification', 
    debug: true
  }
  
  
  pixelBrain = ml5.neuralNetwork(options)
  //pixelBrain.loadData('data.json',loaded)
}

function loaded(){
pixelBrain.train({epochs:50}, finishedTraining)
}

function finishedTraining(){
  console.log('training completed')
  classifyVideo()
}

function classifyVideo() {
  let inputs = []
  video.loadPixels()
  for(let i = 0;i < video.pixels.length; i+=4){
    let r = video.pixels[i+0] /255
    let g = video.pixels[i+1] /255
    let b = video.pixels[i+2] /255
    inputs.push(r,g,b)
  }
  pixelBrain.classify(inputs, gotResults)
  
}

function gotResults(error, results){
  if (error){
    console.log("Error in gotresults.")
    return
  }
  
  label = results[0].label
  
  classifyVideo()
}
  
function addExample(label){
  console.log("addExample called.")
  let inputs = [] 
  video.loadPixels()
  for (let i = 0; i < video.pixels.length;  i+=4){
    let r = video.pixels[i+0]
    let g = video.pixels[i+1]
    let b = video.pixels[i+2]
    inputs.push(r,g,b)
  }
  
  let target = [label]
  //console.log(inputs)
  //console.log(target)
  
  pixelBrain.addData(inputs,target)
}

function keyPressed(){
  
  if (key =='t'){
    //ml5.normalizedata
    pixelBrain.train({epochs:50}, finishedTraining)
    
  
  } else if (key == 's'){
    
    pixelBrain.saveData()
  
  } else if (key){
    
    addExample(key)
}
}



function videoReady(){
  ready=true;
}

function draw() {
  background(0)
  // push()
  // videoSize = slider.value()
  // pop()
  //division_factor = videoSize
  //division_factor = slider.value()
  if(ready) {
    let w = width/videoSize
    video.loadPixels()
    for(let x=0; x<video.width; x++){
      for(let y=0; y <video.height; y++){
        let index = (x + y * video.width) * 4
        let r = video.pixels[index + 0]
        let g = video.pixels[index + 1]
        let b = video.pixels[index + 2]
        noStroke()
        fill(r,g,b)
        rect(x*w,y*w,w,w)
      }
    }
  }
  if (label == 'h'){
    textSize(64)
    textAlign(CENTER, CENTER)
    fill(255)
  text(label, width/2, height/2)
  
  }
  
}
