
import parsed from "./parsed";
import splitter from "./splitter";
import tidyer, { delimiterValidator } from "../util/delimiterClean";
import * as regex from "../util/regex";

/**
 * Parses a CSS selector string into a workable tree.
 * @return an object containing the parts of the selector.
 */
export default function selector(string, init) {
    if (init) {
        let components = splitter(string, regex.rSpecialSeparators),
            comps = tidyer(components.sub, components.delimiters);

        return {
            components: components.sub.map((component) => selector(component, false)),
            delimiters: components.delimiters
        };
    }

    const selected = parsed();

    let current, append,
        cursor = 0,
        components = splitter(string, regex.rSelectorConstructs);

    if (!delimiterValidator(components.sub, components.delimiters)) {
        return;
    }

    // First split into multiple parts

    while (cursor < string.length) {
        let component, substring;

        current = string[cursor];

        // type selector: A type or tag will either be the first component of
        // the selector, or following any of ' ', '>', '~', ',' or '+'
        // delimiters.


        // id selector
        if (current === "#") {
            substring = splitter(string.substring(cursor + 1));
            component = substring.sub[0];
            selected.id = component;

            // Compensate for lost merging characters.
            cursor += component.length + substring.mergedFirst;

            console.log("here! " + component + "\n" + substring.mergedFirst);
        }

        // class selector
        else if (current === ".") {
            substring = splitter(string.substring(cursor + 1));
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
