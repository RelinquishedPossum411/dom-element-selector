
import searcher from "../core/searcher";

export default function (element, ancestorMatch) {
    let ancestor;

    if (element.parentElement) {
        ancestor = element.parentElement;

        while (ancestor) {
            if (searcher(ancestor, ancestorMatch, false))
                return true;

            ancestor = ancestor.parentElement;
        }
    }

    return false;
}
