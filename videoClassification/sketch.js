let mobileNet
let video
let label = "Camera not initialised"
let prob

function modelReady(){
  console.log("Model is Ready !")
  mobileNet.predict(gotResults)
}

function gotResults(error,results){
  if (error) {
    console.log("Could not predict")
    console.log("Probably an internet issue !")
  } else {
    // console.log(results)

    label =results[0].label
    prob = results[0].confidence
    
    mobileNet.predict(gotResults)
  }
}

// function imageReady(){
//   image (plane,0,0,width,height-40)
// }

function setup(){
  createCanvas(640,600)
  background(0)

  video = createCapture(VIDEO)
  video.hide()
  mobileNet = ml5.imageClassifier('MobileNet',video, modelReady)
}

function draw() {
  background(0)
  image (video,0,0)

  fill (255)
  textSize(32)
  text(label,10,height-60)

}