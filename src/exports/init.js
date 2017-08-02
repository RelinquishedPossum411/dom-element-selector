
import Selector from "../core";
import global from "../util/globals";

((global, Selector) => {
    if (typeof define === "function" &&
        define.amd) {
        define(() => {
            global.Selector = Selector;
            return global.Selector;
        });
    } else if (typeof exports === "object") {
        module.exports = Selector;
    } else {
        global.Selector = Selector;
    }
})(global, Selector);
