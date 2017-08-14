
import searcher from "../core/searcher";

export default function (element, olderSiblingMatch) {
    return searcher(element.nextElementSibling, olderSiblingMatch, false);
}
