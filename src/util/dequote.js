
export default function (string) {
    // Strip quotes if and only if the string is encased in quotes.
    let str = string.trim();

    if (str.match(/^\".*\"$/))
        return str.substring(1, str.length - 1);

    return string;
}
