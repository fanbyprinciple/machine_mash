

const a  = character(
    '.#####.' +
    '#.....#' +
    '#.....#' +
    '#######' +
    '#.....#' +
    '#.....#' +
    '#.....#'
)

const b = character(
    '######.' +
    '#.....#' +
    '#.....#' +
    '######.' +
    '#.....#' +
    '#.....#' +
    '######.'
)

const c = character(
    '#######' +
    '#......' +
    '#......' +
    '#......' +
    '#......' +
    '#......' +
    '#######'
)

const net = new brain.NeuralNetwork()
net.train([
    {input: a, output: {a:1}},
    {input: b, output: {b:1}},
    {input: c, output: {c:1}}
], {
    log: detail => console.log(detail)
})

const result = brain.likely(character(
    '#######' +
  '#......' +
  '#......' +
  '#......' +
  '#......' +
  '#......' +
  '#######'
),net)

console.log(result)

function character(string){
    return string.trim().split('').map(integer)
}

function integer(character){
    if('#' === character) return 1;
    return 0;
}