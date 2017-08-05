
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
        pos += components[i].length + 1;
        errorString += components[i] + delimiters[i];

        if (components[i] === "" || components[i + 1] === "") {
            errorString += "\n";

            for (let a of errorString)
                errorString += " ";

            errorString = errorString.substring(0, errorString.length - 1) + "^";

            console.warn("[Selector] Unexpected syntax:\n\t" + errorString + "\n\t");

            return false;
        }
    }

    return true;
}
