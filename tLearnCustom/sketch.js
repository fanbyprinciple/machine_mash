var label = 'Unlabeled'
var mobilenet
var classifier
var strikeButton
var shipButton

var playButton
var switchButton
var prob


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
    prob = result[0].confidence
    classifier.classify(gotResults)
  }
}

function setup(){
  createCanvas(600,400)
  video = createVideo(['strike2.mp4']);
  video.hide()

  mobilenet = ml5.featureExtractor('MobileNet', modelReady)
  classifier = mobilenet.classification(video, videoReady)

  strikeButton = createButton('plane')
  strikeButton.mousePressed(function(){
    console.log("got plane")
    classifier.addImage('Plane')
  })

  shipButton = createButton('Not plane')
  shipButton.mousePressed(function(){
    console.log("got non plane")
    classifier.addImage('Not plane')
  })

  trainButton = createButton('train')
  trainButton.mousePressed(function(){
    classifier.train(whileTraining)
  })

  

  playButton = createButton('play')
  playButton.mousePressed(function(){
    video.loop()
  })

  switchbutton = createButton('switch')
  switchbutton.mousePressed(function(){
    video = createVideo(['strike.mp4'])
    video.hide()
    video.loop()
  })
}

function draw(){
  background(0)
  
  image(video,0,0,320,240)
  fill(255)
  textSize(16)
  text(label+" : " +prob,10,height -10)
}