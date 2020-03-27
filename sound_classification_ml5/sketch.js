console.log(ml5.version)

let soundClassifier

var label = "The model is loading."
var confidence = "pretty confident."
var resultP

function preload(){
    let options = {
        probabilityThreshold: 0.7
    }
    soundClassifier = ml5.soundClassifier('SpeechCommands18w',options)
}

function setup(){
    resultP = createP(label)
    resultP.style('font-size', '32pt')
    
    soundClassifier.classify(gotResults)    
}

function gotResults(err,results){
    if(err){
        console.error(err)
    } else {
        console.log(results[0].label, results[0].confidence)
        label = results[0].label
        confidence = results[0].confidence
        resultP.html(`${label} : ${confidence}`)
    }
}
