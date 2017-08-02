
/**
 * After matching a special character, this method extracts the substring
 * that corresponds with the special character. For example, the first
 * substring extracted following '#' will be an id of an element.
 */
export function getSubstring(string) {
    let strIndex = -1,
        // This will keep track of how many times the first item got merged.
        mergedFirst = 0,
        splitted = string.split(regex.rSpecialCharacters);

    for (let i = 0; i < splitted.length; i++) {
        strIndex += splitted[i].length + 1;

        console.log(splitted);

        if (i === 0)
            continue;

        // Check previous entry, to see if the delimiting character was
        // escaped. If so, put it back.
        if (splitted[i - 1].endsWith("\\")) {
            // Skip if it's a space.
            if (string[strIndex - splitted[i].length] === " ")
                splitted[i - 1] = splitted[i - 1].substring(0, splitted[i - 1].length - 1);
            else {
                if (i - 1 === 0)
                    mergedFirst++;

                splitted.splice(i - 1, 2, splitted[i - 1].substring(0, splitted[i - 1].length - 1) + string[strIndex - splitted[i].length - 1] + splitted[i]);
                i--;
            }
        }

        console.log(splitted);
    }
    
    return {
        sub: splitted,
        length: splitted.length,
        mergedFirst: mergedFirst
    };
}
