
import isEmptyObject from "../../util/tools/isEmptyObject";
import format from "../../util/tools/stringCamelCaseFormatter";

/**
 * Breaks down a search tree to the individual items that are used to
 * match elements in the DOM.
 *
 * @param search - the search tree to build search instructions for.
 *
 * @return 	the search instructions as an array of object literals that contain
 *			the specific details of the search instructions.
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
                    formatted: format(term, true).concat(format(a, true))
                });
            }
        } else {
            routine.push({
                depth: search,
                property: term,
                value: search[term],
                formatted: format(term, true)
            });
        }
    }

    return routine;
}
