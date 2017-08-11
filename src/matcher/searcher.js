
import global from "../util/globals";
import isEmptyObject from "../util/tools/isEmptyObject";
import matches from "./matches/matches";

/**
 * Searches for
 */
export default function searcher(root, search, selected) {
    for (const child of root.children) {
        // Only check the properties that are in the search criteria.
        // Ignore them if they are omitted; assume they match.
        let str,
            matched = 0;

        console.log("Checking " + child);
        console.log("Tree: ");
        console.log(search);

        const routine = buildSearchRoutine(search);

        console.log("Routine:");
        console.log(routine);

        for (const instruction of routine) {
            console.log("Checking instruction " + instruction + " with " + child);
            console.log(instruction);
            console.log(child);

            str = "match" + instruction.formatted;

            if (matches[str] && matches[str](child, instruction.value))
                matched++;
        }

        // Add to selected.
        if (matched === routine.length)
            selected.push(child);

        // Recurse to search all children.
        searcher(child, search, selected);
    }

    return selected;
}

/**
 * Breaks down a search tree to the individual criteria to search for in
 * the DOM.
 */
function buildSearchRoutine(search) {
    let searches = [];

    for (const term of Object.keys(search)) {
        /*console.log("Term " + term);
        console.log(search[term]);
        console.log(!!search[term]);*/
        if (!search[term] || isEmptyObject(search[term]))
            continue;

        if (Object.prototype.toString.call(search[term]) === "[object Object]" &&
            term === "attributes") {
            for (const a of Object.keys(search[term])) {
                if (!search[term][a] || isEmptyObject(search[term][a]))
                    continue;

                searches.push({
                    depth: search[term],
                    property: a,
                    value: search[term][a],
                    formatted: format(term) + format(a)
                });
            }
        } else {
            searches.push({
                depth: search,
                property: term,
                value: search[term],
                formatted: format(term)
            });
        }
    }

    return searches;
}

/**
 * Formats an attribute string so that we can work with it.
 */
function format(string) {
    return string.split(/[-_]+/).map(v => v ? v.charAt(0).toUpperCase() + (v.length > 1 ? v.substring(1) : "") : "").join("");
}
