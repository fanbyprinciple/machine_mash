let mobilenet

let strike

function modelReady(){
  console.log('Model is ready !')
  mobilenet.predict(strike,gotResults)
}

function gotResults(error, results) {
  if (error){
    console.log("Could not predict :(")
    console.log("probably an internet issue!")
  } else {
    console.log("results:", results)
  }
}

function imageReady(){
  image(strike,0,0,width,height)
}

function setup() {
  createCanvas(400,400)

  strike = createImg('images/strike.png',imageReady)
  strike.hide();
  background(0)
  


  mobilenet = ml5.imageClassifier('MobileNet', modelReady)
}

function draw() {
   
}