
import { isSubsetObject as check } from "../../util/isSubset";

/**
 * contains.attribute.js
 * [attribute*=value]
 */
export default function (element, attributeContainsObject) {
    // Use the subset checker tool.
    return check(attributeContainsObject, element.attributes, (a, b, c, d) => {
        return d.name === a && d.value.indexOf(b) !== -1;
    });
}
