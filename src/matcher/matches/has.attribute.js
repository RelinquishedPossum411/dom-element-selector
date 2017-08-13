
import check from "../../util/isSubset";

export default function (element, attributeHasArray) {
    return check(attributeHasArray, element.attributes, (a, b) => {
        return a === b;
    });
}
