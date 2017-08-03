
import { rStringWhitespace as rWs } from "./regex";

/**
 * Cleans up 'fake' space delimiters.
 */
export default function tidy(components, delimiters) {
    if (components.length != delimiters.length + 1)
        return;

    let i = 0,
        j = 1;

    for (; i < delimiters.length; i++) {
        if (rWs.test(delimiters[i])) {
            if (components[j - 1] === "") {
                delimiters.splice(i, 1);
                components.splice(j - 1, 1);
            }

            if (components[j] === "") {
                delimiters.splice(i, 1);
                components.splice(j, 1);
            }
        }
    }
}
