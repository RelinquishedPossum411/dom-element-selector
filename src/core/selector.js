
import parsed from "./parsed";

/**
 * Parses a CSS selector string into JSON.
 * @return an object containing the parts of the selector.
 */
export default function selector(string) {
    const selected = parsed;

    let current, append,
        cursor = 0;

    while (cursor < string.length) {
        current = string[cursor];

        // type selector
        // id selector
        if (current === "#") {

        }

        // class selector
        // attribute selector

        cursor++;
    }

    function isEscaped(char) {
        return char >= 2 && string.substring(char - 2, char) === "\\\\";
    }

    return selected;
}
