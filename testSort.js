let sort = require(`./${process.argv[2]}`)

function getNum() {
    return Math.floor(Math.random() * 999)
}

let array10 = []
let array100 = []
let array1000 = []
let array10000 = []

for (let i = 0; i < 10; i++) {
    array10.push(getNum())
}
for (let i = 0; i < 100; i++) {
    array100.push(getNum())
}
for (let i = 0; i < 1000; i++) {
    array1000.push(getNum())
}
for (let i = 0; i < 10000; i++) {
    array10000.push(getNum())
}
sort([1])

console.time(`n=10: `)
sort(array10)
console.timeEnd(`n=10: `)

console.time(`n=100: `)
sort(array100)
console.timeEnd(`n=100: `)

console.time(`n=1000: `)
sort(array1000)
console.timeEnd(`n=1000: `)

console.time(`n=10000: `)
sort(array10000)
console.timeEnd(`n=10000: `)

let passed = true
let mergeSort = require('./mergeSort')
let sorted = sort(array1000)
let standard = mergeSort(array1000)
let failure = []
for (let i = 0; i < 1000; i++) {
    if (sorted[i] !== standard[i]) {
        passed = false
        failure.push(sorted[i])
        failure.push(standard[i])
        break
    }
}

if (passed) {
    console.log(`${process.argv[2]} passes`)
} else {
    console.log(`${process.argv[2]} fails`)
    console.log(`${failure[0]} !== ${failure[1]}`)
}