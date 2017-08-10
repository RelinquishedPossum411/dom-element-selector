
/**
 * Checks if an element's classList contains all the classes in the
 * search criteria.
 */
export default function (element, classListArray) {
    for (const cl of classListArray)
        if (!element.classList.contains(cl))
            return false;

    return true;
}
