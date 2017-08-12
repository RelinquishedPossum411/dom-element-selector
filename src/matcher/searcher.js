
import buildSearchRoutine from "./core/buildSearchRoutine";
import global from "../util/globals";
import matches from "./matches/matches";

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
export default function searcher(root, search, depthSearch, selected) {
    if (depthSearch) {
        for (const child of root.children) {
            // Only check the properties that are in the search criteria.
            // Ignore them if they are omitted; assume they match.
            let str,
                matched = 0;

            console.log("Checking " + child);
            console.log("Tree: ");
            console.log(search);

            const routine = buildSearchRoutine(search);

            if (runRoutine(child, routine, matches))
                selected.push(child);

            // Recurse to search all children.
            searcher(child, search, depthSearch, selected);
        }

        return selected;
    }
}


function runRoutine(element, routine, namespace) {
    let str,
        matched = 0;

    for (const instruction of routine) {
        str = "match" + instruction.formatted;

        if (namespace[str] && namespace[str](element, instruction.value))
            matched++;
    }

    return matched === routine.length;
}
