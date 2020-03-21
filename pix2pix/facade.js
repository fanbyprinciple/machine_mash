const SIZE =256
let inputImg, inputCanvas
let outputContainer, statusMsg
let pix2pix, clearBtn
let transferBtn
let modelReady = false, isTransfering = false

let colors =  {
    background: "#0006d9",
    wall: "#0d3dfb",
    door: "#a50000",
    "element": "#0075ff",
    "element sill": "#68f898",
    "element head": "#1dffdd",
    shutter: "#eeed28",
    balcony: "#b8ff38",
    trim: "#ff9204",
    cornice: "#ff4401",
    column: "#f60001",
    entrance: "#00c9ff"
  }


brushColor = '#0075ff'

function setup(){
    inputCanvas = createCanvas(SIZE, SIZE)
    inputCanvas.class('border-box').parent('canvasContainer')

    inputImg = loadImage('images/facade.jpg', drawImage)

    outputContainer = select('#output')
    statusMsg = select('#status')

    transferBtn = select('#transferBtn')
    clearBtn = select('#clearBtn')

    colorBtn = select('#submit')

    
    console.log(brushColor)

    clearBtn.mousePressed(function(){
        clearCanvas()
    })

    stroke(0)
    pixelDensity(1)

    pix2pix = ml5.pix2pix('models/facades_BtoA.pict', modelLoaded)
    
    background('#0006d9')
}

let initialX = 0
let initialY = 0
let finalX = 0
let finalY = 0

elements = []

function draw(){
    background('#0006d9')
    
    
    elements.forEach((element, index) => {
        fill (element[4])
        rect(element[0], element[1], element[2]-element[0], element[3] - element[1])    
    });
    
    
}

function mousePressed(){
    initialX = mouseX
    initialY = mouseY
}

function mouseReleased(){
    finalX = mouseX
    finalY = mouseY
    elements.push([initialX, initialY, finalX, finalY, brushColor])
}

function modelLoaded(){
    statusMsg.html('Model loaded')

    modelReady = true

    //transfer()

    transferBtn.mousePressed(function(){
        transfer()
    })

    colorBtn.mousePressed(function(){
        brushColor = select('#color').value()
    })
}

function drawImage(){
    //image(inputImg,0,0)
}

function clearCanvas(){
    elements = []
}

function transfer(){
    isTransfering = true

    statusMsg.html('Applying style transfer.')

    const canvasElement = select('canvas').elt

    pix2pix.transfer(canvasElement, function(err, result){
        if (err){
            console.log(err)
        }

        if (result && result.src){
            isTransfering = false
            outputContainer.html('')
            createImg(result.src).class('border-box').parent('output')
            statusMsg.html('Done!')
        }
    })
}