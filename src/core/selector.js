
import parsed from "./parsed";
import getSubstring from "./splitter";
import * as regex from "../util/regex";

/**
 * Parses a CSS selector string into a workable tree.
 * @return an object containing the parts of the selector.
 */
export default function selector(string) {
    const selected = parsed();

    let current, append,
        cursor = 0;

    // First split into multiple parts

    while (cursor < string.length) {
        let component, substring;

        current = string[cursor];

        // type selector: A type or tag will either be the first component of
        // the selector, or following any of ' ', '>', '~', ',' or '+'
        // delimiters.


        // id selector

        if (current === "#") {
            substring = getSubstring(string.substring(cursor + 1));
            component = substring.sub[0];
            selected.id = component;

            // Compensate for lost merging characters.
            cursor += component.length + substring.mergedFirst;

            console.log("here! " + component + "\n" + substring.mergedFirst);
        }

        // class selector
        else if (current === ".") {
            substring = getSubstring(string.substring(cursor + 1));
            component = substring.sub[0];


            selected.classes.push(component);

            cursor += component.length + substring.mergedFirst;
        }

        // attribute selector

        cursor++;
    }

    function isEscaped(char) {
        return char >= 2 && string.substring(char - 2, char) === "\\";
    }

    return selected;
}
