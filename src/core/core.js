
import selector from "./selector";
import splitter from "./splitter";
import tidyer from "../util/delimiterClean";

export default class Selector {
    static select(string) {
        return selector(string, true);
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
