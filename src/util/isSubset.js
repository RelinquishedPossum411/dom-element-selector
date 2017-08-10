
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

    for (const a in arr1) {
        for (const b in arr2) {
            if ((fn && fn(arr1[a], arr2[b])) || arr1[a] === arr2[b])
                break;

            i++;
        }

        if ((proper && i >= arr2.length) ||
            (i > arr2.length))
            return false;
    }

    return true;
}
