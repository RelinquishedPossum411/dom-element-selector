
import searcher from "../core/searcher";

export default function (element, olderDistantSiblingMatch) {
	let olderSibling;

	if (element.previousElementSibling) {
		olderSibling = element.previousElementSibling;

		while (olderSibling) {
			if (searcher(olderSibling, olderDistantSiblingMatch))
				return olderSibling;

			olderSibling = olderSibling.previousElementSibling;
		}
	}

	return false;
}
