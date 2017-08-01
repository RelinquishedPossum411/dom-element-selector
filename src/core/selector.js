
import parsed from "./parsed";

/**
 * Parses a CSS selector string into JSON.
 * @return an object containing the parts of the selector.
 */
export default function selector(string) {
    const selected = parsed;

    let current,
        cursor = 0;

    while (cursor < string.length) {
        current = string[cursor];

        // type selector
        // id selector


        // class selector
        // attribute selector

        cursor++;
    }

    return selected;
}
