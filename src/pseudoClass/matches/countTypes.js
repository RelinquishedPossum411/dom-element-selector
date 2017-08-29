
/**
 * Counts the number of elements with the same parent that have the same type
 * starting from a root element.
 *
 * @param element
 * @param type
 *
 * @return returns the number of elements of the same type that share a common
 * parent element.
 */
export default function (element, type) {
	return countTypes(element, type, 0);
}

function countTypes(rootChild, type, path) {
	if (!rootChild)
		return 0;

	let add = path ? path < 0 ? countTypes(rootChild.previousElementSibling, type, -1) :
								countTypes(rootChild.nextElementSibling, type, 1) : countTypes(rootChild.previousElementSibling, type, -1) + countTypes(rootChild.nextElementSibling, type, 1);

	if (rootChild.tagName.toUpperCase() === type.toUpperCase())
		return 1 + add;

	return add;
}
