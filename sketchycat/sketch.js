let model
let strokePath = null

let x,y
let pen = "down"

function setup() {
  createCanvas(400, 400)
  x = width/2
  y = height/2
  model = ml5.sketchRNN('cat', modelReady)
  background(0);
}

function modelReady(){
  console.log('model ready !')
  model.reset()
  model.generate(gotSketch)

}

function draw() {
  textSize(32);
text('Random cat doodles for you !', 10, 30);
  if (strokePath != null){
    let newX =x+strokePath.dx * 0.7
    let newY = y +strokePath.dy * 0.7
    
    if (pen == 'down'){
    stroke(255)
    strokeWeight(4)
    line(x,y,newX,newY )
    
    }
    
    pen = strokePath.pen
    
    strokePath = null
    x = newX
    y = newY
    
     if(pen != "end"){
     model.generate(gotSketch)

     }  else {
      
       background(0)
       model.reset()
       model.generate(gotSketch)
       x = height/2
       y = width/2
     }     
  }
  
}

function gotSketch(error,s){
  if(error){
    console.log('error: ', error)
  } else {
  strokePath = s
  
  }
  
}