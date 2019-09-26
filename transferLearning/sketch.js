let mobileNet
let video
let label = " Camera not inititalised."

function modelReady(){
  console.log("Model loaded.")
}

function setup(){
  createCanvas(640,600)
  background(0)

  video = createCapture(VIDEO)
  video.hide()

  mobilenet = ml5.featureExtractor('MobileNet', modelReady)
}

function draw() {
  background(0)

  image (video,0,0)

  fill (255)
  textSize(32)
  text(label,10, height-50)

}