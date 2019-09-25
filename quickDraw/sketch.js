var cats_data
var trains_data
var rainbows_data

let cats_training
let trains_training
let rainbows_training


function preload() {
    cats_data = loadBytes('data/cats1000.bin')
    trains_data = loadBytes('data/trains1000.bin')
    rainbows_data = loadBytes('data/rainbows1000.bin')
}

function setup() {
    createCanvas(280,280)
    background(0)


    let total = 100
    for(let i = 0; i < total; i ++){
        let img = createImage(28,28)
        img.loadPixels()
        let offset = i * 784
        for (let j =0 ;j <784 ; ++j){
            let val = 255 - cats_data.bytes[j + offset]
            img.pixels[j*4 + 0] = val
            img.pixels[j*4 + 1] = val
            img.pixels[j*4 + 2] = val
            img.pixels[j*4 + 3] = 255
            
            
        }
        img.updatePixels()

        let x = (i%10) * 28;
        let y = floor(i/10) *28;
        image(img,x, y)
    }

}