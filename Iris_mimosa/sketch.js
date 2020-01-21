let model
let targetLabel =  'C'
let trainingData = []

let state = 'collection' 

function setup() {
  createCanvas(400, 400);
  let options ={ 
    inputs: ['x', 'y'],
    outputs:['label'],
    task:'classification', 
    debug: 'true',
    
  }
  
  model = ml5.neuralNetwork(options)
}

function keyPressed(){
  
  if(key == 't'){
    state = 'training'
    console.log('started training')
    model.normalizeData()
    let options = {
      epochs:200
    }
    model.train(options, whileTraining, finishedTraining)
  } else {
  targetLabel = key.toUpperCase()
  }
}

function whileTraining(epoch, loss){
  console.log(epoch)
}

function finishedTraining(){
  state = 'prediction'
  console.log("Finished training.")
}

function mousePressed(){
  
  let inputs = {
    x: mouseX,
    y: mouseY
  }
  
  if(state = 'collection'){
    let target = {
      label: targetLabel
    }
    model.addData(inputs, target)
  
  
  target = {
    label: targetLabel
  }
  
  model.addData(inputs, target)
  
  stroke(0)
  console.log((targetLabel.charCodeAt(0) - 40) +100)
  fill((targetLabel.charCodeAt(0) - 40) + 140,(targetLabel.charCodeAt(0) - 40) * 6 ,(targetLabel.charCodeAt(0) - 40) *8,100)
  ellipse(mouseX, mouseY, 24 )
  fill(0)
  textAlign(LEFT,CENTER)
  text(targetLabel, mouseX, mouseY,24)
  } else if (state == 'prediction'){
    model.classify(inputs, gotResults)
    
  }
}

function gotResults(){
  if(error){
    console.error(error)
  }
  console.log(results)
  stroke(0)
  fill(0,0,255,100)
  ellipse(mouseX, mouseY, 24)
  fill(0)
  noStroke()
  textAlign(LEFT,CENTER)
  text(results[0].label, mouseX, mouseY)

}
