
import { isSubsetObject as check } from "../../util/isSubset";

export default function (element, attributeEndsWithObject) {
    return check(attributeEndsWithObject, element.attributes, (a, b, c, d) => {
        return d.name === a && d.value.endsWith(b);
    });
}
