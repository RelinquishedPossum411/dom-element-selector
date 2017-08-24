
import * as matches from "./matches/matches";
import { removeEmptyItems as tidyer } from "../util/tidyer";
import { rParenthesis } from "../util/regex";

/**
 * Parses a string that represents a pseudo-class. Splits the string by
 * parenthesis.
 *
 * @param string - a substring that represents a pseudo-class. Pass the
 * substring that immediately follows a colon, ':'.
 */
export default function (string) {
    const pseudoClass = tidyer(string.split(rParenthesis));

    // Index 0 : pseudo-class name
    // Index 1 : parameters, if any
    // If the pseudo-class function is implemented, evaluate by using it,
    // if not simply 'skip' by returning true.
    return matches[pseudoClass[0]] ? matches[pseudoClass[0]](pseudoClass[1]) : true;
}
