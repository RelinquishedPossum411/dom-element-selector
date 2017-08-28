
import pseudoFirstChild from "./firstChild";
import pseudoLastChild from "./lastChild";

// Each pseudo-class function receives two parameters:
//  1. the element being checked.
//  2. the value of any parameters of the pseudo-class, like nth-child(n).
// So the value, n, is passed in. If there is no parameter, pass in undefined.
export default {
    firstChild: pseudoFirstChild,
	lastChild: pseudoLastChild
};
