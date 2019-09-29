var label = 'Unlabeled'
var mobilenet
var classifier
var strikeButton
var shipButton


function modelReady(){
  console.log("Model is ready !")

}

function videoReady(){
  console.log("Video is ready !!")

}

function whileTraining(loss){
  if(loss == null){
    console.log('Training complete.')
    classifier.classify(gotResults)
  } else {
    console.log(loss)
  
  }
}

function gotResults(error, result){
  if(error) {
    console.log(error)
  } else {
    console.log(result[0].label)
    label = result[0].label;
    classifier.classify(gotResults)
  }
}

function setup(){
  createCanvas(320,270)
  video = createCapture(VIDEO)
  video.hide()

  mobilenet = ml5.featureExtractor('MobileNet', modelReady)
  classifier = mobilenet.classification(video, videoReady)

  strikeButton = createButton('strike formation')
  strikeButton.mousePressed(function(){
    classifier.addImage('Strike')
  })

  shipButton = createButton('ship formation')
  shipButton.mousePressed(function(){
    classifier.addImage('Ship')
  })

  trainButton = createButton('train')
  trainButton.mousePressed(function(){
    classifier.train(whileTraining)
  })
}

function draw(){
  background(0)
  image(video,0,0,320,240)
  fill(255)
  textSize(16)
  text(label,10,height -10)
}