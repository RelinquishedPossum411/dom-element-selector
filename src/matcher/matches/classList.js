
/**
 * Checks if an element's classList strictly contains all the classes in the
 * search criteria.
 */
export default function (element, classListArray) {
    if (element.classList.length !== classListArray.length)
        return false;

    for (const cl of element.classList) {
        if (!classListArray.includes(cl))
            return false;
    }

    return true;
}
