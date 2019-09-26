let mobileNet
let plane

function modelReady(){
  console.log("Model is Ready !")
  mobileNet.predict(plane,gotResults)
}

function gotResults(error,results){
  if (error) {
    console.log("Could not predict")
    console.log("Probably an internet issue !")
  } else {
    console.log(results)
  }
}

function imageReady(){
  image (plane,0,0,width,height-40)
}

function setup(){
  createCanvas(400,400)
  background(0)

  plane = createImg('images/flight.png',imageReady)
  plane.hide()
  mobileNet = ml5.imageClassifier('MobileNet', modelReady)
}

function draw() {}