
import * as regex from "../util/regex";

/**
 * Splits a string about a regex, by default if no regex is specified, then
 * it will split by any 'special character.' Then all strings with escaped
 * characters are concatenated.
 */
export default function splitter(string, reg) {
    console.log("splitting " + string);

    reg = reg ? reg : regex.rSpecialCharacters;

    let strIndex = -1,
        // This will keep track of how many times the first item got merged.
        mergedFirst = 0,
        delimiters = [],
        splitted = string.split(reg);

    for (let i = 0; i < splitted.length; i++) {
        strIndex += splitted[i].length + 1;

        console.log(splitted);
        console.log(delimiters);

        if (i === 0)
            continue;

        // Check previous entry, to see if the delimiting character was
        // escaped. If so, put it back.
        if (splitted[i - 1].endsWith("\\")) {
            if (i - 1 === 0)
                mergedFirst++;

            splitted.splice(i - 1, 2, splitted[i - 1].substring(0, splitted[i - 1].length - 1) + string[strIndex - splitted[i].length - 1] + splitted[i]);
            i--;
        } else {
            // If it is not escaped, record the delimiter
            delimiters.push(string[strIndex - splitted[i].length - 1]);
        }

        console.log(splitted);
    }

    return {
        sub: splitted,
        delimiters: delimiters,
        length: splitted.length,
        mergedFirst: mergedFirst
    };
}
