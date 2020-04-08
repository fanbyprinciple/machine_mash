let video

function setup(){
    createCanvas(640,480)
    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelReady)
    poseNet.on('pose', gotPoses)
}

let skeleton
var noseX = 0
var noseY = 0
var eyelX = 0
var eyelY = 0
function gotPoses(poses){
    //console.log(poses)
    skeleton = poses
    if (poses.length > 0){
        let newX = poses[0].pose.keypoints[0].position.x
        let newY = poses[0].pose.keypoints[0].position.y
        let eX = poses[0].pose.keypoints[1].position.x
        let eY = poses[0].pose.keypoints[1].position.y

        noseX = lerp(noseX,newX,0.2)
        noseY = lerp(noseY, newY, 0.2)
        eyelX = lerp(eyelX, eX, 0.2)
        eyelY = lerp(eyelY, eY, 0.2)
    }
    
}

function modelReady(){
    console.log("model ready.")
}

function draw(){
    image(video,0,0)
    //filter (GRAY)

    let d = dist(noseX, noseY, eyelX, eyelY)

    fill (255,0,0)
    ellipse(noseX, noseY, d)

    // fill(0,255,120)
    // ellipse(eyelX, eyelY,40 )
}
