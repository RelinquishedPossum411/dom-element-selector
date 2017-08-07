
import selector from "./selector";
import splitter from "./splitter";
import tidyer from "../util/delimiterClean";
import Logger from "../util/logger";
import * as regex from "../util/regex";

/**
 * Divides the initial string into groups so that they can be parsed
 * individually.
 */
 export default function grouper(string) {
     const logger = Logger.newLogger("selector");
     let components = splitter(string, regex.rSpecialSeparators);

     // Clean the components up.
     if (tidyer(components.sub, components.delimiters))
        logger.add("Successfully tidied up the components.");
    else
        logger.add("Fatal error in cleaning up the components.");

     return {
         components: components.sub.map((component) => {
             let tree = selector(component);

             if (!tree) {
                 logger.add("Failed to parse. Throwing error...");
                 throw new Error("Parsing failed.");
            }

            return tree;
         }),
         delimiters: components.delimiters
     };
 }
