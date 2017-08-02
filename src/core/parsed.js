

let parsed = {
    // An ancestor, but not necessarily a direct ancestor.
    ancestor: null,

    // A descendant, but not necessarily a direct descendant.
    descendant: null,

    // An immediate ancestor.
    parent: null,

    // An immediate descendant.
    child: null,
    tag: "",
    id: "",
    classes: [],
    attributes: {
        // [attribute=match]
        match: {},

        // [attribute*=match]
        contains: {},

        // [attribute~=match]
        matchSpaces: {},

        // [attribute|=match]
        matchDashes: {},

        // [attribute^=match]
        startsWith: {},

        // [attribute$=match]
        endsWith: {},

        // [attribute]
        has: []
    }
};

export default function () {
    return Object.create(parsed);
};
