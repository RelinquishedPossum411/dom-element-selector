
/**
 * 'Flattens' an array.
 */
export default function (array, depth) {
    return flatten(array, depth, 0);
}

function flatten(array, depth = 0, currentDepth = 0) {
    if (array.length === 0 || (depth && depth !== 0 && currentDepth > depth))
        return array;

    if (array.length === 1)
        return isArray(array[0]) ? flatten(array[0], depth, currentDepth + 1) : array;

    return  isArray(array[0]) ?
            flatten(array[0], depth, currentDepth + 1).concat(flatten(array.slice(1), depth, currentDepth + 1)) :
            [array[0]].concat(flatten(array.slice(1), depth, currentDepth + 1));
}

function isArray(array) {
    // Polyfill
    return Array.isArray ? Array.isArray(array) : Object.prototype.toString.call(array) === "[object Array]";
}
