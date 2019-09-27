let mobilenet
let predictor
let slider
let addButton
let trainButton
let value = 0


function modelReady(){
  console.log("Model is ready.")
}

function videoReady(){
  console.log("Video is ready.")
}

function whileTraining(loss){
  if(loss == null){
    console.log("Training complete")
    predictor.predict(gotResults)
  } else {
    console.log(loss)
  }
}

function gotResults(error, result) {
  if(error) {
    console.log(error)
  } else {
    value = result
    predictor.predict(gotResults)
  }
}

function setup(){

  createCanvas(320,270)
  video = createCapture(VIDEO)
  video.hide()
  background(0)

  mobilenet = ml5.featureExtractor('MobileNet', modelReady)
  predictor = mobilenet.regression(video,videoReady)

  slider = createSlider(0, 1, 0.5, 0.01)
  addButton = createButton('add example image')
  addButton.mousePressed(function(){
    predictor.addImage(slider.value())
  })

  trainButton = createButton('train')
  trainButton.mousePressed(function(){
    predictor.train(whileTraining)
  })
}

function draw(){
  background(0)
  image(video, 0 , 0, 320, 240)
  rectMode(CENTER)
  fill(255,0,200)
  rect(value*innerWidth,height/2, 50,50)

  fill(255) 
  textSize(16)
  text(value, 10, height -10)
}