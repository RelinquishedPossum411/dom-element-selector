
import searcher from "../core/searcher";

export default function (element, olderDistantNeighborMatch) {
	let olderNeighbor;

	if (element.previousElementSibling) {
		olderNeighbor = element.previousElementSibling;

		while (olderNeighbor) {
			if (searcher(olderNeighbor, olderDistantNeighborMatch))
				return olderNeighbor;

			olderNeighbor = olderNeighbor.previousElementSibling;
		}
	}

	return false;
}
