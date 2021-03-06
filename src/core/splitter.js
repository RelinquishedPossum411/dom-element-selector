
import Logger from "../util/logger";
import * as regex from "../util/regex";

/**
 * Splits a string about a regex, by default if no regex is specified, then
 * it will split by any 'special character.' Then all strings with escaped
 * characters are concatenated.
 */
export default function splitter(string, reg) {
    reg = reg || regex.rSpecialCharacters;

    const logger = Logger.getLogger("selector");

    let delimiter,
        strIndex = -1,
        delimiters = [],
        splitted = string.split(reg);

    logger.log("Splitting string: '" + string + "'");

    for (let i = 0; i < splitted.length; i++) {
        strIndex += splitted[i].length + 1;
        delimiter = string[strIndex - splitted[i].length - 1];

        logger.log("Split string into parts:");
        logger.log("\tComponents: " + splitted.toString());
        logger.log("\tDelimiters: " + delimiters.toString());

        if (i === 0)
            continue;

        // Check previous entry, to see if the delimiting character was
        // escaped. If so, put it back.
        if (splitted[i - 1].endsWith("\\") ||
            (delimiter.match(/^\~$/) && splitted[i].startsWith("="))) {
            splitted.splice(i - 1, 2, splitted[i - 1].substring(0, splitted[i - 1].length - (splitted[i - 1].endsWith("\\") ? 1 : 0)) + delimiter + splitted[i]);
            i--;
        } else {
            // If it is not escaped, record the delimiter
            delimiters.push(delimiter);
        }
    }

    fixAttributes(splitted, delimiters);

    return {
        sub: splitted,
        delimiters: delimiters
    };
}

function fixAttributes(components, delimiters) {
    let i = 0;

    for (; i < delimiters.length; i++) {
        if (delimiters[i].match(/^\[$/)) {
            while (!delimiters[i + 1].match(/^\]$/) && i + 1 < delimiters.length) {
                components.splice(i + 1, 2, components[i + 1] + delimiters[i + 1] + components[i + 2]);
                delimiters.splice(i + 1, 1);
            }
        }
    }
}
