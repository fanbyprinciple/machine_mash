var mobilenet
var classifier

var label = 'Not yet trained'

var video

function getAllFiles(dirPath) {
    fs.readdirSync(dirPath).forEach(function (file){
        let filePath = path.join(dirPath, file)
        let stat = fs.statSync(filePath)
        if (stat.isDirectory()){
            getAllFiles(filePath)
        } else {
            console.in
        }

    })
}

function setup(){

    createCanvas(640,540)
    video = createVideo(['strike.mp4'])
    video.hide()

    mobilenet =ml5.featureExtractor('MobileNet', modelReady)
    classifier = mobilenet.classification(video, videoReady)

    //traversing the dataset to get images

    playButton = createButton('play')
    playButton.mousePresssed(function(){
        video.loop()
    })

    
}

function draw() {
    background(0)

}