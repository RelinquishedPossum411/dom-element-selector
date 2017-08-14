
import searcher from "../core/searcher";

export default function (element, olderSiblingMatch) {
    return element.nextElementSibling ? searcher(element.nextElementSibling, olderSiblingMatch, false) : false;
}
