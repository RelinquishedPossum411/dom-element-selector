
import countTypes from "./countTypes";

export default function (element) {
	return countTypes(element, element.tagName) === 1;
}
