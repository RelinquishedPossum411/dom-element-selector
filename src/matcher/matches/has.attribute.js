
import check from "../../util/isSubset";

/**
 * Checks if an array of strings representing attributes is a subset of the
 * collection of attributes of an element.
 *
 * @param element - the element containing the superset of attributes.
 * @param attributeHasArray - an array containing strings representing
 * attributes to check with the attributes collection of the specified element.
 *
 * @return whether attributeHasArray is a subset of element.attributes.
 */
export default function (element, attributeHasArray) {
    return check(attributeHasArray, element.attributes, (a, b) => {
        return a === b;
    });
}
