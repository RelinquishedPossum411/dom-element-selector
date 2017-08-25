
import matches from "./matches/matches";
import format from "../util/tools/stringCamelCaseFormatter";
import { rParenthesis } from "../util/regex";

/**
 * Evaluates each entry in an object literal of pseudo-classes and checks if it
 * matches the equivalent properties in a specified DOM element.
 *
 * @param element - an element of the DOM.
 * @param pseudoClasses - an object literal representing the pseudo-classes in
 * a selector.
 *
 * @return returns true if
 */
export default function (element, pseudoClasses) {
    // If the pseudo-class function is implemented, evaluate by using it,
    // if not simply 'skip' by returning true.
    for (const pseudoClass in pseudoClasses) {
        if (matches[pseudoClass] && !matches[pseudoClass](element, pseudoClasses[pseudoClass]))
            return false;
    }

    return true;
}
