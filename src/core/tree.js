
import grouper from "./grouper";

/**
 * Relates all components with each other using the rules of the delimiters.
 */
export default function (string) {
    const   components = grouper(string),
            comps = components.components,

            // Return an array, as there might be separate selectors delimited
            // by a comma. Acts like boolean AND.
            trees = [comps[0]];

    let lastTree;

    for (const [index, delimiter] of components.delimiters.entries()) {

        lastTree = trees[trees.length - 1];

        // Delimiters: ',', '+', '~', '>' and ' '.
        // Link them linearly.
        if (delimiter.match(/^ $/)) {
            // Space, so link them as distant relatives.

            comps[index + 1].descendant = lastTree;
            lastTree.ancestor = comps[index + 1];
        }

        else if (delimiter.match(/^\+$/)) {
            // Plus sign links elements that are adjacent.

            comps[index + 1].youngerSibling = lastTree;
            lastTree.olderSibling = comps[index + 1];
        }

        else if (delimiter.match(/^\~$/)) {
            // Tilde links distant elements.

            comps[index + 1].youngerDistantSibling = lastTree;
            lastTree.olderDistantSibling = comps[index + 1];
        }

        else if (delimiter.match(/^\>$/)) {
            // Immediate parent/child relationship.
            comps[index + 1].child = lastTree;
            lastTree.parent = comps[index + 1];
        }

        else if (delimiter.match(/^\,$/)) {
            // New tree.
            trees.push(comps[index + 1]);
        }

        else {
            return null;
        }
    }

    return trees;
}
