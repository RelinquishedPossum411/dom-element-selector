
/**
 * Evaluates whether the first array is a subset of the second.
 * If the method is called with a callback function as the last parameter, then
 * the a subset relationship is determined by the result of the callback.
 *
 * @param arr1 - array to check for a subset relationship.
 * @param arr2 - array to check for a superset relationship.
 * @param fn - a callback function to evaluate the values between the arrays.
 * @param proper - checks for a strictly proper-subset relationship.
 * @return whether there is a subset/superset relationship between the arrays.
 */
export default function (arr1, arr2, fn, proper) {
    let i = 0;

    const   hasOwn = Object.prototype.hasOwnProperty,
            keys1 = Object.keys(arr1),
            keys2 = Object.keys(arr2);

    if (keys1.length > keys2.length)
        return false;

    for (const a of keys1) {
        if (!keys2.includes(a))
            return false;

        for (const b of keys2) {
            if (!(hasOwn.call(arr1, a) && hasOwn.call(arr2, b)))
                continue;

            if ((fn && fn(arr1[a], arr2[b])) || arr1[a] === arr2[b])
                break;

            i++;
        }

        if ((proper && i >= keys2.length) ||
            (i > keys2.length))
            return false;
    }

    return true;
}

export function isSubsetObject(obj1, obj2, fn, proper) {
    let i = 0;

    const   keys1 = Object.keys(obj1),
            keys2 = Object.keys(obj2);

    if (keys1.length > keys2.length)
        return false;

    for (const item of keys1) {
        if (fn) {
            for (const that of keys2) {
                if (fn(item, obj1[item], that, obj2[that]))
                    break;

                i++;
            }

            // Did not find an entry in obj1 in obj2.
            if (i >= keys2.length)
                return false;
        } else {
            if (!keys2.includes(item))
                return false;

            if (obj1[item] !== obj2[item])
                return false;
        }
    }

    return proper ? keys1.length < keys2.length : true;
}
