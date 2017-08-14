
/**
 * Checks if an element's classList contains all the classes in the
 * search criteria.
 *
 * @param element - the element to check with the class list.
 * @param classListArray - an array of strings that represent a class.
 *
 * @return whether the classListArray is a subset of element.classList.
 */
export default function (element, classListArray) {
    for (const cl of classListArray)
        if (!element.classList.contains(cl))
            return false;

    return true;
}
