
import makeTree from "../core/tree";
import searcher from "./searcher";
import flatten from "../util/tools/flatten";
import global from "../util/globals";

export default function (string) {
    // Call our makeTree function to build a relationship between the elements
    // we are trying to look for in the DOM.
    const   tree = makeTree(string),
            doc = global.document;

    return flatten(tree.map(t => {
        console.log("Indiv:");
        console.log(t);
        return searcher(doc, t, true, []);
    }), 1);
}
