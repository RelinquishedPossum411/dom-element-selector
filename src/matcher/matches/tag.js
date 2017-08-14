
export default function (element, tag) {
    // If we match a tag as "*", then select everything!
    return tag.match(/^\*$/) || element.tagName.toLowerCase() === tag.toLowerCase();
}
