
/**
 * Reduces a string by removing all junk characters and applying a camel-cased
 * format.
 *
 * @param string - a string to camel-case-itize.
 * @param capitalizeFirstCharacter - capitalizes the first character of the
 * first substring if true.
 *
 * @return returns a formatted string in camel-case.
 */
export default function (string, capitalizeFirstCharacter) {
    return string.split(/[-_\s]+/).map((a, b) => b > 0 || capitalizeFirstCharacter ? a ? a.charAt(0).toUpperCase() + (a.length > 1 ? a.substring(1) : "") : "" : a).join("");
}
