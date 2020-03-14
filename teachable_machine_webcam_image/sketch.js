//https://teachablemachine.withgoogle.com/models/3AMXn4hv/

let video

let classifier

let label = 'waiting..'

function preload(){
  classifier = ml5.imageClassifier('https://teachablemachine.withgoogle.com/models/3AMXn4hv/'+'model.json')
}

function setup() {
  createCanvas(640, 520);
  video = createCapture(VIDEO)
  video.hide()
  
  classifyVideo()
}

function classifyVideo(){
  classifier.classify(video,gotResults)
}

function gotResults(error, results){
  if(error){
    console.error(error)
    return
  }
  
  label = results[0].label
  classifyVideo()
}

function draw() {
  background(0);
  image(video,0,0)
  
  textSize(32)
  textAlign(CENTER, CENTER)
  fill(255)
  text(label, width/2, height -16)
  
  let emoji = label
  
  textSize(128)
  text(emoji, width/2, height/2)

}