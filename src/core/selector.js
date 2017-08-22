
import grouper from "./grouper";
import parsed from "./parsed";
import splitter from "./splitter";
import tidyer, { delimiterValidator } from "../util/delimiterClean";
import * as regex from "../util/regex";
import dequote from "../util/dequote";

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

    for (let i = 0; i < delimiters.length; i++) {
        // classes
        if (delimiters[i].match(/^\.$/)) {
            selected.classes.push(parts[i + 1]);
        }

        // id
        else if (delimiters[i].match(/^\#$/)) {
            if (!selected.id)
                selected.id = parts[i + 1];
            else
                return;
        }

        else if (delimiters[i].match(/^\[$/)) {
            // Check if there is a closing brace.
            if (delimiters[i + 1] && delimiters[i + 1] !== "]")
                return;

            if (parts[i + 1]) {
                // Take out the attribute.
                let lastCharacter, join, sub,
                    attr = selected.attributes,
                    split = parts[i + 1].split(/=/),
                    first = split[0];

                if (split.length === 1) {
                    // Then there is only the attribute.
                    attr.has.push(first);
                } else {
                    join = dequote(split.slice(1).join("="));
                    lastCharacter = first.charAt(first.length - 1);
                    sub = first.substring(0, first.length - 1);

                    // Switch cases for the type of match.
                    if (lastCharacter.match(/^\*$/)) {
                        // Split by "=", so join the strings again with "=".
                        if (!attr.contains[sub])
                            attr.contains[sub] = join;
                    }

                    else if (lastCharacter.match(/^\~$/)) {
                        attr.spaces[sub] = join;
                    }

                    else if (lastCharacter.match(/^\|$/)) {
                        attr.dashes[sub] = join;
                    }

                    else if (lastCharacter.match(/^\^$/)) {
                        if (!attr.startsWith[sub])
                            attr.startsWith = join;
                    }

                    else if (lastCharacter.match(/^\$$/)) {
                        if (!attr.endsWith[sub])
                            attr.endsWith = join;
                    }

                    else {
                        // Finally, if no match, then we seek an exact match.
                        if (!attr.matches[first]) {
                            attr.matches[first] = join;
                        }
                    }
                }
            }

            // Pseudo-classes
            else if (delimiters[i].match(/^\:$/)) {

            }
        }
    }

    return selected;
}
