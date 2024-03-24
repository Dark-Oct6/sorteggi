'use strict'

function sumDigits(x) {
    if (x === 0) {
        return 0
    }

    let e = Math.floor(Math.log10(x)) + 1
    let sum = 0

    for (let i = 0; i < e; i++) {
        sum += Math.floor(x % 10 ** (i + 1) / 10 ** i)
    }

    return sum
}

let sumList = {}

function calculate() {
    let model = document.getElementById('model').value
    const strenght = document.getElementById('model-strenght').value - 0

    let pages = [1, document.getElementById('pages').value]
    let pageRange = pages[1]
    if (model === 'lib_no_est') {
        pages[0] += Math.round(Math.min(((pageRange * 0.05) ** 0.9 + 10), 50) ** (0.5 + strenght))
        pages[1] -= Math.round(Math.min(((pageRange * 0.05) ** 0.9 + 10), 50) ** (0.5 + strenght))
        pageRange = pages[1] - pages[0] + 1
    }

    let range = document.getElementById('range').value
    let right = document.getElementById('right')
    let left = document.getElementById('left')

    if (((pageRange < 1 || range < 1) || (pageRange > 1e4 || range > 1e2) && !document.getElementById('safe').checked)) {
        alert('Valori troppo grandi/piccoli')
        return
    }

    sumList = {}
    for (let i = 1; i <= range; i++) {
        sumList[i] = 0
    }

    right.innerHTML = ''
    const discard = document.getElementById('discard-0').checked
    for (let i = pages[0]; i <= pages[1]; i++) {
        let n = sumDigits(i)

        if (n > range) {
            if (discard) {
                right.innerHTML += '<s>' + i +': ' + n + '</s><br>'
            }
            continue
        }

        right.innerHTML += i +': ' + n + '<br>'

        sumList[n]++
    }

    left.innerHTML = ''
    for (let i = 1; i <= range; i++) {
        left.innerHTML += i + ': ' + (sumList[i] / pageRange * 100).toFixed(5) + '% (1/' + (pageRange / sumList[i]).toFixed(3) + '); (' + sumList[i] + ')<br>'
    }

    let max = 0
    for (let i = 1; i <= range; i++) {
        max = Math.max(max, sumList[i])
    }

    const graph = document.getElementById('graph')
    const ctx = graph.getContext('2d')
    ctx.fillStyle = '#000000'
    ctx.fillRect(0, 0, 1000, 1000)
    ctx.fillStyle = '#ffffff'
    for (let i = 1; i <= range; i++) {
        let coordinates = [
            1000 / range * (i - 1),
            0,
            1000 / range,
            1000 * sumList[i] / max
        ]
        ctx.fillRect(coordinates[0], coordinates[1], coordinates[2], coordinates[3])
    }
}

document.getElementById("model-strenght").addEventListener("input", function() {
    const strenght = document.getElementById('model-strenght').value
    document.getElementById('strenght-display').innerHTML = (strenght - 0).toFixed(3)
});

function toggleList() {
    const list = document.getElementById('list')
    const disp = list.style.display
    list.style.display = disp === 'none' ? 'block' : 'none'
}
toggleList()