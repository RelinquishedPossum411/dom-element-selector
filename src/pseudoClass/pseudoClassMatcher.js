
import { removeEmptyItems as tidyer } from "../util/delimiterClean";
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
}
