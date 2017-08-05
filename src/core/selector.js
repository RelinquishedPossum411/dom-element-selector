
import grouper from "./grouper";
import parsed from "./parsed";
import splitter from "./splitter";
import tidyer, { delimiterValidator } from "../util/delimiterClean";
import * as regex from "../util/regex";

/**
 * Parses a CSS selector string into a workable tree.
 * Would parse a string like: "tag#id.class".
 *
 * @return an object containing the parts of the selector.
 */
export default function selector(string) {
    const selected = parsed();

    let parts, delimiters,
        cursor = 0,
        components = splitter(string, regex.rSelectorConstructs);

    if (!delimiterValidator(components.sub, components.delimiters)) {
        return;
    }

    console.log(components.sub);
    console.log(components.delimiters);

    parts = components.sub;
    delimiters = components.delimiters;

    // Check each delimiter with its respective string.
    // tag
    if (parts[0]) {
        if (!selected.tag)
            selected.tag = parts[0];
        else
            return;
    }

    for (let i = 0; i < parts.length; i++) {
        // classes
        if (delimiters[i] === ".") {
            selected.classes.push(parts[i + 1]);
        }

        // id
        else if (delimiters[i] === "#") {
            if (!selected.id)
                selected.id = parts[i + 1];
            else
                return;
        }
    }

    return selected;
}
