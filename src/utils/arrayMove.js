/**
 * Copyright (c) 2015-present, Haltu Oy
 * Released under the MIT license
 * https://github.com/haltu/muuri/blob/master/LICENSE.md
 */

import normalizeArrayIndex from './normalizeArrayIndex';

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

/**
 * Move array item to another index.
 *
 * @param {Array} array
 * @param {Number} fromIndex
 *   - Index (positive or negative) of the item that will be moved.
 * @param {Number} toIndex
 *   - Index (positive or negative) where the item should be moved to.
 * @param {Number} toIndex
 *   - Index (positive or negative) where the item should be moved to.
 * @param {Set<Number>} frozenIndexes
 *   - Index (positive or negative) of frozen items
 */
export default function arrayMove(array, fromIndex, toIndex, frozenIndexes = []) {
    // Make sure the array has two or more items.
    if (array.length < 2) return;
    console.log(frozenIndexes)

    // Normalize the indices.
    var from = normalizeArrayIndex(array, fromIndex);
    var to = normalizeArrayIndex(array, toIndex);

    if (frozenIndexes.includes(to)) {
        return
    }

    // Add target item to the new position.
    if (from !== to) {
        move(array, from, to, frozenIndexes)
    }
}
