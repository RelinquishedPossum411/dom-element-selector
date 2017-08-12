
import { isSubsetObject as check } from "../../util/isSubset";

export default function (element, attributeDashesObject) {
    return check(attributeDashesObject, element.attributes, (a, b, c, d) => {
        return d.name === a && d.value.split(/\-/).includes(b);
    });
}
