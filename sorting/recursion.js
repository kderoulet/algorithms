function getFactorial(num) {
    if (num < 0) {
        return undefined
    } else if (num == 0) {
        return 1
    } else if (num <= 1) {
        return num
    }
    return num * getFactorial(num-1)
}

module.exports = getFactorial