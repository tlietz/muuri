function arrayInit() {
    return [0, 1, 2, 3, 4, 5]
}

function testcase(frozenSet, fromIndex, toIndex, expectedArray, startArray = arrayInit()) {
    return {
        startArray: startArray,
        from: fromIndex,
        to: toIndex,
        frozen: frozenSet,
        expected: expectedArray
    }
}

let testcases = [
    testcase(new Set(), 0, 0, arrayInit(), arrayInit()),
    testcase(new Set(), 1, 2, [0, 2, 1, 3, 4, 5], arrayInit()),
    testcase(new Set([0]), 1, 3, [0, 2, 3, 1, 4, 5], arrayInit()),
    testcase(new Set([1]), 0, 2, [2, 1, 0, 3, 4, 5], arrayInit()),
    testcase(new Set([1]), 0, 4, [2, 1, 3, 4, 0, 5], arrayInit()),
    testcase(new Set([1, 2]), 0, 5, [3, 1, 2, 4, 5, 0], arrayInit()),
    testcase(new Set([1, 2]), 0, 4, [3, 1, 2, 4, 0, 5], arrayInit()),
    testcase(new Set([1, 3]), 0, 4, [2, 1, 4, 3, 0, 5], arrayInit()),
    testcase(new Set([1, 3]), 2, 5, [0, 1, 4, 3, 5, 2], arrayInit()),
]

function move(array, from, to, frozen) {
    array.splice(to, 0, array.splice(from, 1)[0]);
}

let i = 0
for (test of testcases) {
    ({ startArray: array, from, to, frozen, expected } = test)
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
            break
        }
    }

    i++
}
