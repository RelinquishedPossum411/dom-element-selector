
import matcher from "../matcher/matcher";
import makeTree from "./tree";
import grouper from "./grouper";
import splitter from "./splitter";

export default class {
    static match(string) {
        return matcher(string);
    }

    static tree(string) {
        try {
            return makeTree(string);
        } catch (exception) {
            console.error("[Selector] Parsing error occurred when executing tree(): " + exception);
        }
    }

    static select(string, pipeToConsole) {
        try {
            return grouper(string);
        } catch (exception) {
            console.error("[Selector] Parsing error:\n" + exception);
        }

        if (pipeToConsole)
            this.getLastLog().toConsole();
    }

    static getLastLog() {
        return Logger.getLogger("selector");
    }
}
