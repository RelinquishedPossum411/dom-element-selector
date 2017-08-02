
import selector from "./selector";
import splitter from "./splitter";

export default class Selector {
    static select(string) {
        return selector(string);
    }

    // TODO: remove - debugging only.
    static substringer(string, regex) {
        return splitter(string, regex);
    }
}
