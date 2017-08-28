
import firstChild from "./firstChild";

/**
 * :nth-Child
 * A recursive approach the evaluating the place of an element among its
 * children.
 *
 * @param element - the element passed in by the matcher.
 * @param nth - the first parameter specified in the selector string.
 *
 * @return returns whether an element is n - 1 elements from the first element.
 */
export default function nthChild(element, nth) {
	if (typeof nth !== "number")
		nth = Number.parseInt(nth);

	if (nth <= 0)
		nth = 1;

	if (nth === 1)
		return firstChild(element);

	return element.previousElementSibling ? nthChild(element.previousElementSibling, nth - 1) : false;
}
