let video

function setup(){
    createCanvas(640,480)
    video = createCapture(VIDEO)
    video.hide()
    poseNet = ml5.poseNet(video, modelReady)
    poseNet.on('pose', gotPoses)
}
let skeleton
function gotPoses(poses){
    //console.log(poses)
    skeleton = poses
    if (poses.length > 0){
        noseX = poses[0].pose.keypoints[0].position.x
        noseY = poses[0].pose.keypoints[0].position.y
    }
    
}

function modelReady(){
    console.log("model ready.")
}

function draw(){
    image(video,0,0)
    filter (GRAY)

    fill (255,0,0)
    ellipse(noseX, noseY, 50)

}
