
import selector from "./selector";
import splitter from "./splitter";
import tidyer from "../util/delimiterClean";
import * as regex from "../util/regex";

/**
 * Divides the initial string into groups so that they can be parsed
 * individually.
 */
 export default function grouper(string) {
     let components = splitter(string, regex.rSpecialSeparators);

     // Clean the components up.
     tidyer(components.sub, components.delimiters);

     return {
         components: components.sub.map((component) => {
             let tree = selector(component);

             if (!tree)
                throw new Error("[Selector] Parsing failed.");

            return tree;
         }),
         delimiters: components.delimiters
     };
 }
