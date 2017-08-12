
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

    // Before Neighbor: adjacent only
    beforeNeighbor: null,

    // After Neighbor: adjacent only
    afterNeighbor: null,

    beforeDistantNeighbor: null,

    afterDistantNeighbor: null,

    tag: "",
    id: "",
    classes: [],
    attributes: {
        // [attribute=match]
        match: {},

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
};
