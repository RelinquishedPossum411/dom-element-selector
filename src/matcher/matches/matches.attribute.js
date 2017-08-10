
/**
 * matches.attribute.js
 * [attribute=value].
 */
export default function (element, attributeMatchesObject) {
    // element.attributes
    // Check that all attributes to match are present in the element.
    let matched = 0;

    for (const attribute in attributeMatchesObject) {
        // NamedNodeMap does not have a method to verify the existence of
        // an item.
        for (const attr of element.attributes) {
            if (attribute === attr.name &&
                attributeMatchesObject[attribute] === attr.value) {
                matched++;
                break;
            }
        }
    }

    return matched === attributeMatchesObject.length;
}
