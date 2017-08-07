
import { rStringWhitespace as rWs } from "./regex";

/**
 * Cleans up 'fake' space delimiters.
 */
export default function tidy(components, delimiters) {
    if (components.length != delimiters.length + 1)
        return;

    let i = 0;

    for (; i < delimiters.length; i++) {
        if (rWs.test(delimiters[i])) {
            if (components[i] === "") {
                delimiters.splice(i, 1);
                components.splice(i, 1);
                i--;
            }
            else if (components[i + 1] === "") {
                delimiters.splice(i, 1);
                components.splice(i + 1, 1);
                i--;
            }
        }
    }

    return true;
}

/**
 * Validates a split selector by validating if a delimiter does not separate
 * two empty strings. Delimiter "." cannot separate "" and "". In other words,
 * a delimiter cannot separate nothing.
 *
 * @return whether the components and delimiters passed the test.
 */
export function delimiterValidator(components, delimiters) {
    if (components.length != delimiters.length + 1) {
        console.error("[Selector] Potential parsing problem.");
        return false;
    }

    let i = 0,
        // Position of delimiter for debugging purposes.
        pos = -1,
        errorString = "";

    for (; i < delimiters.length; i++) {
        errorString += components[i] + delimiters[i];

        if (components[i] === "" || components[i + 1] === "") {
            // Skip special cases:
            // "#id" and ".class" are acceptable.
            if (components[i] === "" && i === 0)
                continue;

            // A closing square bracket is acceptable as a closing delimiter.
            if (i >= delimiters.length - 1 && delimiters[i].match(/^\]$/))
                continue;

            // An attribute selector that immediately follows another attribute
            // selector is acceptable.
            if (delimiters[i].match(/^\]$/) && delimiters[i + 1] && delimiters[i + 1].match(/^\[$/))
                continue;

            if (delimiters[i].match(/^\[$/) && delimiters[i - 1] && delimiters[i - 1].match(/^\]$/))
                continue;

            errorString += "\n";

            for (let a of errorString)
                errorString += " ";

            errorString = errorString.substring(0) + "\t^";

            console.warn("[Selector] Unexpected syntax on string '" + components[i] + delimiters[i] + (components[i + 1] || "") + "':\n\t" + errorString);

            return false;
        }
    }

    return true;
}
