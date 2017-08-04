
import grouper from "./grouper";
import splitter from "./splitter";
import tidyer from "../util/delimiterClean";

export default class Selector {
    static select(string) {
        try {
            return grouper(string);
        } catch (exception) {
            console.error("[Selector] Parsing error:\n" + exception);
            return null;
        }
    }

    // TODO: remove - debugging only.
    static substringer(string, regex) {
        return splitter(string, regex);
    }

    static tidy(components, delimiters) {
        tidyer(components, delimiters);

        return [components, delimiters];
    }
}
