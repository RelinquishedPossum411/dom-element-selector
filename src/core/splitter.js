
import Logger from "../util/logger";
import * as regex from "../util/regex";

/**
 * Splits a string about a regex, by default if no regex is specified, then
 * it will split by any 'special character.' Then all strings with escaped
 * characters are concatenated.
 */
export default function splitter(string, reg) {
    reg = reg ? reg : regex.rSpecialCharacters;

    const logger = Logger.getLogger("selector");

    let delimiter,
        strIndex = -1,
        // This will keep track of how many times the first item got merged.
        mergedFirst = 0,
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
            (delimiter.match(/\~/) && splitted[i].startsWith("="))) {
            if (i - 1 === 0)
                mergedFirst++;

            splitted.splice(i - 1, 2, splitted[i - 1].substring(0, splitted[i - 1].length - (splitted[i - 1].endsWith("\\") ? 1 : 0)) + delimiter + splitted[i]);
            i--;
        } else {
            // If it is not escaped, record the delimiter
            delimiters.push(delimiter);
        }
    }

    return {
        sub: splitted,
        delimiters: delimiters,
        length: splitted.length,
        mergedFirst: mergedFirst
    };
}
