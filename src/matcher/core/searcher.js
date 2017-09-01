
import Routine from "../../util/tools/searchRoutine";
import global from "../../util/globals";
import matches from "../matches/matches";

/**
 * Starting from a root element, the method recursively attempts to match
 * all match criteria from the buildSearchRoutine method. Performs a pre-order
 * traversal of the DOM sub-tree with the root at some element in the DOM.
 *
 * @param root - the starting point of the search.
 * @param search - a search tree derived from "../core/parsed.js".
 * @param depthSearch - if false, returns whether the root matches the search
 *                      tree.
 * @param selected - an array to store selected elements.
 *
 * @return returns @param selected.
 */
export default function searcher(root, tree, depthSearch, selected) {
    if (depthSearch) {
        for (const child of root.children) {
            // Only check the properties that are in the search criteria.
            // Ignore them if they are omitted; assume they match.
            const routine = new Routine(tree);

            if (routine.run(child, matches))
                selected.push(child);

            // Recurse to search all children.
            searcher(child, tree, depthSearch, selected);
        }

        return selected;
    }

    // If depthSearch is false, then just check if the root matches the routine.
    return new Routine(tree).run(root, matches);
}
