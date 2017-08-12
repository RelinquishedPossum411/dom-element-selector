
import isEmptyObject from "../../util/tools/isEmptyObject";

/**
 * Breaks down a search tree to the individual criteria to search for in
 * the DOM.
 */
export default function (search) {
    let routine = [];

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

                routine.push({
                    depth: search[term],
                    property: a,
                    value: search[term][a],
                    formatted: format(term) + format(a)
                });
            }
        } else {
            routine.push({
                depth: search,
                property: term,
                value: search[term],
                formatted: format(term)
            });
        }
    }

    return routine;
}

/**
 * Formats an attribute string so that we can work with it.
 */
function format(string) {
    return string.split(/[-_]+/).map(v => v ? v.charAt(0).toUpperCase() + (v.length > 1 ? v.substring(1) : "") : "").join("");
}
