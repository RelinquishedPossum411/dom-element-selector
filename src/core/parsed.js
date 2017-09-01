
import { deepMergeObject as deep } from "../util/deepCopy";

let parsed = {
    // An ancestor, but not necessarily a direct ancestor.
    ancestor: null,

    // A descendant, but not necessarily a direct descendant.
    descendant: null,

    // An immediate ancestor.
    parent: null,

    // An immediate descendant.
    child: null,

    // An immediately preceding sibling.
    youngerSibling: null,

    // An immediately following sibling.
    olderSibling: null,

    // A sibling, but younger.
    youngerDistantSibling: null,

    // A sibling, but older.
    olderDistantSibling: null,

    tag: "",
    id: "",
    classes: [],
    pseudoClasses: {},
    attributes: {
        // [attribute=match]
        matches: {},

        // [attribute*=match]
        contains: {},

        // [attribute~=match]
        spaces: {},

        // [attribute|=match]
        dashes: {},

        // [attribute^=match]
        startsWith: {},

        // [attribute$=match]
        endsWith: {},

        // [attribute]
        has: []
    }
};

export default function () {
    return deep({}, parsed);
}
