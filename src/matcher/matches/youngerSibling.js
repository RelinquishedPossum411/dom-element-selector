
import searcher from "../core/searcher";

export default function (element, youngerSiblingMatch) {
    // Using our single match function of the searcher.
    return searcher(element.previousElementSibling, youngerSiblingMatch, false);
}
