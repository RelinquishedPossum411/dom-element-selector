
import makeTree from "../core/tree";
import global from "../util/globals";

export default function (string) {
    // Call our makeTree function to build a relationship between the elements
    // we are trying to look for in the DOM.
    const   tree = makeTree(string),
            doc = global.document,
            matches = [];


    return matches;
}
