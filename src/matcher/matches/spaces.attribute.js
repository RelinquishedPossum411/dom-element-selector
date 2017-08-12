
import { isSubsetObject as check } from "../../util/isSubset";

export default function (element, attributeSpacesObject) {
    return check(attributeSpacesObject, element.attributes, (a, b, c, d) => {
        return d.name === a && d.value.split(/\s/).includes(b);
    });
}
