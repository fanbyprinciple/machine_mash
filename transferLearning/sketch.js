let mobileNet
let video
let label = " Model not initialised ."
let planeButton
let notPlaneButton
let trainBUtton

function modelReady(){
  console.log("Model loaded.")
}

function videoReady(){
  console.log("Video is ready.")  

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
  if (error){
    console.log("Classifier could not execute. Check the internet")
  } else {
    console.log(result)
    label = result[0].label
    classifier.classify(gotResults)
  }
}



function setup(){
  createCanvas(640,600)
  background(0)

  video = createCapture(VIDEO)
  video.hide()

  mobilenet = ml5.featureExtractor('MobileNet', modelReady)
  classifier = mobilenet.classification(video, videoReady)

  planeButton = createButton('plane')
  planeButton.mousePressed(function(){
    classifier.addImage('plane')
  })

  notPlaneButton = createButton('notPlane')
  notPlaneButton.mousePressed(function(){
    classifier.addImage('notPlane')
  })

  trainButton = createButton('train')
  trainButton.mousePressed(function(){
    classifier.train(whileTraining);
  })
}

function draw() {
  background(0)

  image (video,0,0)

  fill (255)
  textSize(32)
  text(label,10, height-50)

}