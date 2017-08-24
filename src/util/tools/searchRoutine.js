
import buildSearchRoutine from "./buildSearchRoutine";
import format from "./stringCamelCaseFormatter";

export default class {
    constructor(searchTree) {
        this.routine = buildSearchRoutine(searchTree);
    }

    run(element, functionNamespace, prefix) {
        if (!this.routine)
            return;

        let str;

        for (const instruction of this.routine) {
            str = (prefix || "match") + instruction.formatted;

            if (functionNamespace[str] && !functionNamespace[str](element, instruction.value))
                return false;
        }

        return true;
    }
}
