
import searcher from "../core/searcher";

export default function (element, parentMatch) {
    return element.parentElement ? searcher(element.parentElement, parentMatch) : false;
}
