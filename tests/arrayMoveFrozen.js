function arrayInit() {
    return [0, 1, 2, 3, 4, 5]
}

function testcase(num, frozen, fromIndex, toIndex, expectedArray, startArray = arrayInit()) {
    return {
        num: num,
        from: fromIndex,
        to: toIndex,
        frozen: frozen,
        startArr: startArray,
        expected: expectedArray
    }
}

let testcases = [
    testcase(0, [], 0, 0, arrayInit(), arrayInit()),
    testcase(1, [], 1, 2, [0, 2, 1, 3, 4, 5], arrayInit()),
    testcase(2, [0], 1, 3, [0, 2, 3, 1, 4, 5], arrayInit()),
    testcase(3, [1], 0, 2, [2, 1, 0, 3, 4, 5], arrayInit()),
    testcase(4, [1], 0, 4, [2, 1, 3, 4, 0, 5], arrayInit()),
    testcase(5, [1, 2], 0, 5, [3, 1, 2, 4, 5, 0], arrayInit()),
    testcase(6, [1, 2], 0, 4, [3, 1, 2, 4, 0, 5], arrayInit()),
    testcase(7, [1, 3], 0, 4, [2, 1, 4, 3, 0, 5], arrayInit()),
    testcase(8, [1, 3], 2, 5, [0, 1, 4, 3, 5, 2], arrayInit()),
]

function move(array, from, to, frozen) {
    if (frozen.size === 0) {
        array.splice(to, 0, array.splice(from, 1)[0]);
        return
    }
    let frozenIndexItem = {}
    // save the items that have been frozen to reinsert to array later 
    // go through in reverse order so .splice() doesn't mess up indexes that are yet to be removed
    for (let i = frozen.length - 1; i >= 0; i--) {
        const frozenIdx = frozen[i]
        if (from >= frozenIdx) {
            from--
        }
        if (to >= frozenIdx) {
            to--
        }
        frozenIndexItem[frozenIdx] = array.splice(frozenIdx, 1)[0];
    }

    // move all non-frozen items in array
    array.splice(to, 0, array.splice(from, 1)[0]);

    // reinsert frozen items
    for (const idx of frozen) {
        array.splice(idx, 0, frozenIndexItem[idx]);
    }
}

let i = 0
let tests = 0
let fail = 0
for (let test of testcases) {
    ({ startArr: array, from, to, frozen, expected } = test)
    let start = [...array]

    if (from !== to) {
        move(array, from, to, frozen)
    }

    for (let idx = 0; idx < array.length; idx++) {
        if (array[idx] != expected[idx]) {
            console.log("\n------------------\nFAIL\n")
            console.log("Got: ")
            console.log(array)
            console.log("Want:")
            console.log(expected)
            console.log(testcases[i])
            fail++
            break
        }
    }

    // Test that doing the opposite function brings the array back to what it was
    if (from !== to) {
        move(array, to, from, frozen)
    }

    for (let idx = 0; idx < array.length; idx++) {
        if (array[idx] != start[idx]) {
            console.log("\n------------------\nFAIL REVERSE BACK TO START ARRAY\n")
            console.log("Got: ")
            console.log(array)
            console.log("Want:")
            console.log(expected)
            console.log(testcases[i])
            fail++
            break
        }
    }

    i++
    tests += 2
}

console.log(`\nFAILED: ${fail} \nTOTAL: ${tests}`)
