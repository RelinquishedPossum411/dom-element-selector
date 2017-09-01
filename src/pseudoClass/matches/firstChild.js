
export default function (element) {
    // Is first-child if element does not have a previous sibling.
    return !element.previousElementSibling;
}
