
import { isSubsetObject as check } from "../../util/isSubset";

/**
 * startsWith.attribute.js
 * [attribute^=value]
 */
export default function (element, attributeStartsWithObject) {
    return check(attributeStartsWithObject, element.attributes, (a, b, c, d) => {
        return d.name === a && d.value.startsWith(b);
    });
}
