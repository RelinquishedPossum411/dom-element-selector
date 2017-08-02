
import parsed from "./parsed";
import * as regex from "../util/regex";

/**
 * Parses a CSS selector string into JSON.
 * @return an object containing the parts of the selector.
 */
export default function selector(string) {
    const selected = parsed;

    let current, append,
        cursor = 0;

    while (cursor < string.length) {
        let component;

        current = string[cursor];

        // type selector
        // id selector
        if (current === "#") {
            component = getSubstring(string.substring(cursor + 1)).sub[0];
            console.log("here! " + component);
        }

        // class selector
        // attribute selector

        cursor++;
    }

    /**
     * After matching a special character, this method extracts the substring
     * that corresponds with the special character. For example, the first
     * substring extracted following '#' will be an id of an element.
     */
    function getSubstring(string) {
        let strIndex = -1,
            splitted = string.split(regex.rSpecialCharacters);

        for (let i = 0; i < splitted.length; i++) {
            strIndex += splitted[i].length + 1;

            if (i == 0)
                continue;

            // Check previous entry, to see if the delimiting character was
            // escaped. If so, put it back.
            if (splitted[i - 1].endsWith("\\")) {
                // Skip if it's a space.
                if (string[strIndex - splitted[i].length] === " ")
                    splitted[i - 1] = splitted[i - 1].substring(0, splitted[i - 1].length - 1);
                else {
                    splitted.splice(i - 1, 2, splitted[i - 1].substring(0, splitted[i - 1].length - 1) + string[strIndex - splitted[i].length - 1] + splitted[i]);
                    i--;
                }
            }

            console.log(splitted);
        }

        return {
            sub: splitted,
            length: splitted.length
        };
    }

    function isEscaped(char) {
        return char >= 2 && string.substring(char - 2, char) === "\\";
    }

    return selected;
}
