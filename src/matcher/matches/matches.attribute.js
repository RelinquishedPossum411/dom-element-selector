
import { isSubsetObject as check } from "../../util/isSubset";

/**
 * matches.attribute.js
 * [attribute=value].
 */
export default function (element, attributeMatchesObject) {
    // NamedNodeMap does not have a method to verify the existence of
    // an item, so use our subset checker.

    // Use our subset checker to check for a subset relationship.
    return check(attributeMatchesObject, element.attributes, (a, b, c, d) => {
        return d.name === a && d.value === b;
    });
}
