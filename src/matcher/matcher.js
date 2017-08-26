
import makeTree from "../core/tree";
import searcher from "./core/searcher";
import flatten from "../util/tools/flatten";
import global from "../util/globals";

export default function (string) {
    // Call our makeTree function to build a relationship between the elements
    // we are trying to look for in the DOM.
    const tree = makeTree(string);

    return flatten(tree.map(t => searcher(global.document, t, true, [])), 1);
}
