
import grouper from "./grouper";
import splitter from "./splitter";
import tidyer from "../util/delimiterClean";
import Logger from "../util/logger";

export default class Selector {
    static select(string, pipeToConsole) {
        try {
            return grouper(string);
        } catch (exception) {
            console.error("[Selector] Parsing error:\n" + exception);
            return null;
        }

        if (pipeToConsole)
            this.getLastLog().toConsole();
    }


    static getLastLog() {
        return Logger.getLogger("selector");
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
