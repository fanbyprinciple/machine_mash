const SIZE =256
let inputImg, inputCanvas
let outputContainer, statusMsg
let pix2pix, clearBtn
let transferBtn
let modelReady = false, isTransfering = false

function setup(){
    inputCanvas = createCanvas(SIZE, SIZE)
    inputCanvas.class('border-box').parent('canvasContainer')

    inputImg = loadImage('images/handbag.png', drawImage)

    outputContainer = select('#output')
    statusMsg = select('#status')

    transferBtn = select('#transferBtn')
    clearBtn = select('#clearBtn')

    clearBtn.mousePressed(function(){
        clearCanvas()
    })

    stroke(0)
    pixelDensity(1)

    pix2pix = ml5.pix2pix('models/edges2handbags_AtoB.pict', modelLoaded)
}

function draw(){
    if (mouseIsPressed) {
        line (mouseX, mouseY, pmouseX, pmouseY)
    }
}

function mouseReleased(){
    if (modelReady && !isTransfering){
        //transfer()
    }
}

function modelLoaded(){
    statusMsg.html('Model loaded')

    modelReady = true

    transfer()

    transferBtn.mousePressed(function(){
        transfer()
    })
}

function drawImage(){
    image(inputImg,0,0)
}

function clearCanvas(){
    background(255)
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