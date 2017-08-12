/******/ (function(modules) { // webpackBootstrap
/******/ 	// The module cache
/******/ 	var installedModules = {};
/******/
/******/ 	// The require function
/******/ 	function __webpack_require__(moduleId) {
/******/
/******/ 		// Check if module is in cache
/******/ 		if(installedModules[moduleId]) {
/******/ 			return installedModules[moduleId].exports;
/******/ 		}
/******/ 		// Create a new module (and put it into the cache)
/******/ 		var module = installedModules[moduleId] = {
/******/ 			i: moduleId,
/******/ 			l: false,
/******/ 			exports: {}
/******/ 		};
/******/
/******/ 		// Execute the module function
/******/ 		modules[moduleId].call(module.exports, module, module.exports, __webpack_require__);
/******/
/******/ 		// Flag the module as loaded
/******/ 		module.l = true;
/******/
/******/ 		// Return the exports of the module
/******/ 		return module.exports;
/******/ 	}
/******/
/******/
/******/ 	// expose the modules object (__webpack_modules__)
/******/ 	__webpack_require__.m = modules;
/******/
/******/ 	// expose the module cache
/******/ 	__webpack_require__.c = installedModules;
/******/
/******/ 	// define getter function for harmony exports
/******/ 	__webpack_require__.d = function(exports, name, getter) {
/******/ 		if(!__webpack_require__.o(exports, name)) {
/******/ 			Object.defineProperty(exports, name, {
/******/ 				configurable: false,
/******/ 				enumerable: true,
/******/ 				get: getter
/******/ 			});
/******/ 		}
/******/ 	};
/******/
/******/ 	// getDefaultExport function for compatibility with non-harmony modules
/******/ 	__webpack_require__.n = function(module) {
/******/ 		var getter = module && module.__esModule ?
/******/ 			function getDefault() { return module['default']; } :
/******/ 			function getModuleExports() { return module; };
/******/ 		__webpack_require__.d(getter, 'a', getter);
/******/ 		return getter;
/******/ 	};
/******/
/******/ 	// Object.prototype.hasOwnProperty.call
/******/ 	__webpack_require__.o = function(object, property) { return Object.prototype.hasOwnProperty.call(object, property); };
/******/
/******/ 	// __webpack_public_path__
/******/ 	__webpack_require__.p = "";
/******/
/******/ 	// Load entry module and return exports
/******/ 	return __webpack_require__(__webpack_require__.s = 8);
/******/ })
/************************************************************************/
/******/ ([
/* 0 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return rSpecialCharacters; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return rSpecialSeparators; });
/* unused harmony export rWhitespace */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "d", function() { return rStringWhitespace; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return rSelectorConstructs; });

const   rSpecialCharacters = /[!"#$%&'()+,./:;<=>?@[\]^`{|}~ ]/,
        rSpecialSeparators = /[>+~,\s]/,
        rWhitespace = /\s/,
        rStringWhitespace = /^\s$/,
        rSelectorConstructs = /[\[\]#:.+]/,
        rSelectAll = /[*]/;




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = grouper;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__selector__ = __webpack_require__(13);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__splitter__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_delimiterClean__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_logger__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_regex__ = __webpack_require__(0);







/**
 * Divides the initial string into groups so that they can be parsed
 * individually.
 */
 function grouper(string) {
     const logger = __WEBPACK_IMPORTED_MODULE_3__util_logger__["a" /* default */].newLogger("selector");
     let components = Object(__WEBPACK_IMPORTED_MODULE_1__splitter__["a" /* default */])(string, __WEBPACK_IMPORTED_MODULE_4__util_regex__["c" /* rSpecialSeparators */]);

     // Clean the components up.
     if (Object(__WEBPACK_IMPORTED_MODULE_2__util_delimiterClean__["a" /* default */])(components.sub, components.delimiters))
        logger.add("Successfully tidied up the components.");
    else
        logger.add("Fatal error in cleaning up the components.");

     return {
         components: components.sub.map((component) => {
             let tree = Object(__WEBPACK_IMPORTED_MODULE_0__selector__["a" /* default */])(component);

             if (!tree) {
                 logger.add("Failed to parse. Throwing error...");
                 throw new Error("Parsing failed.");
            }

            return tree;
        }).reverse(),
         delimiters: components.delimiters.reverse()
     };
 }


/***/ }),
/* 2 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = splitter;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_logger__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_regex__ = __webpack_require__(0);




/**
 * Splits a string about a regex, by default if no regex is specified, then
 * it will split by any 'special character.' Then all strings with escaped
 * characters are concatenated.
 */
function splitter(string, reg) {
    reg = reg ? reg : __WEBPACK_IMPORTED_MODULE_1__util_regex__["b" /* rSpecialCharacters */];

    const logger = __WEBPACK_IMPORTED_MODULE_0__util_logger__["a" /* default */].getLogger("selector");

    let delimiter,
        strIndex = -1,
        delimiters = [],
        splitted = string.split(reg);

    logger.log("Splitting string: '" + string + "'");

    for (let i = 0; i < splitted.length; i++) {
        strIndex += splitted[i].length + 1;
        delimiter = string[strIndex - splitted[i].length - 1];

        logger.log("Split string into parts:");
        logger.log("\tComponents: " + splitted.toString());
        logger.log("\tDelimiters: " + delimiters.toString());

        if (i === 0)
            continue;

        // Check previous entry, to see if the delimiting character was
        // escaped. If so, put it back.
        if (splitted[i - 1].endsWith("\\") ||
            (delimiter.match(/^\~$/) && splitted[i].startsWith("="))) {
            splitted.splice(i - 1, 2, splitted[i - 1].substring(0, splitted[i - 1].length - (splitted[i - 1].endsWith("\\") ? 1 : 0)) + delimiter + splitted[i]);
            i--;
        } else {
            // If it is not escaped, record the delimiter
            delimiters.push(delimiter);
        }
    }

    fixAttributes(splitted, delimiters);

    return {
        sub: splitted,
        delimiters: delimiters
    };
}

function fixAttributes(components, delimiters) {
    let i = 0;

    for (; i < delimiters.length; i++) {
        if (delimiters[i].match(/^\[$/)) {
            while (!delimiters[i + 1].match(/^\]$/) && i + 1 < delimiters.length) {
                components.splice(i + 1, 2, components[i + 1] + delimiters[i + 1] + components[i + 2]);
                delimiters.splice(i + 1, 1);
            }
        }
    }
}


/***/ }),
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = Loggers;

const loggers = {};

function Loggers() {}

Loggers.getLogger = function (name) {
    if (!name) {
        if (!loggers[native])
            loggers[native] = new Logger();

        return loggers[native];
    }

    return loggers[name] || null;
}

Loggers.newLogger = function (name) {
    if (!name) {
        if (!loggers[native])
            loggers[native] = new Logger();

        return loggers[native];
    }

    loggers[name] = new Logger();

    return loggers[name];
}

class Logger {
    constructor() {
        this.lines = [];
    }

    add(string) {
        this.lines.push(string + "");
    }

    append(string) {
        if (this.lines.length) {
            this.lines[this.lines.length - 1].concat(string + "");
        }
    }

    appendFirst(string) {
        if (this.lines.length) {
            this.lines[0].concat(string + "");
        }
    }

    log(string) {
        this.add(string);
    }

    toString() {
        let string = "";

        for (let i = 0; i < this.lines.length; i++) {
            string += "[" + (i + 1) + "] " + this.lines[i];
        }

        return string;
    }

    toConsole() {
        for (let i = 0; i < this.lines.length; i++)
            console.log("[" + (i + 1) + "] " + this.lines[i]);
    }
}


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = tidy;
/* harmony export (immutable) */ __webpack_exports__["b"] = delimiterValidator;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__regex__ = __webpack_require__(0);



/**
 * Cleans up 'fake' space delimiters.
 */
function tidy(components, delimiters) {
    if (components.length != delimiters.length + 1)
        return;

    let i = 0;

    for (; i < delimiters.length; i++) {
        if (__WEBPACK_IMPORTED_MODULE_0__regex__["d" /* rStringWhitespace */].test(delimiters[i])) {
            if (components[i] === "") {
                delimiters.splice(i, 1);
                components.splice(i, 1);
                i--;
            }
            else if (components[i + 1] === "") {
                delimiters.splice(i, 1);
                components.splice(i + 1, 1);
                i--;
            }
        }
    }

    return true;
}

/**
 * Validates a split selector by validating if a delimiter does not separate
 * two empty strings. Delimiter "." cannot separate "" and "". In other words,
 * a delimiter cannot separate nothing.
 *
 * @return whether the components and delimiters passed the test.
 */
function delimiterValidator(components, delimiters) {
    if (components.length != delimiters.length + 1) {
        console.error("[Selector] Potential parsing problem.");
        return false;
    }

    let i = 0,
        // Position of delimiter for debugging purposes.
        pos = -1,
        errorString = "";

    for (; i < delimiters.length; i++) {
        errorString += components[i] + delimiters[i];

        if (components[i] === "" || components[i + 1] === "") {
            // Skip special cases:
            // "#id" and ".class" are acceptable.
            if (components[i] === "" && i === 0)
                continue;

            // A closing square bracket is acceptable as a closing delimiter.
            if (i >= delimiters.length - 1 && delimiters[i].match(/^\]$/))
                continue;

            // An attribute selector that immediately follows another attribute
            // selector is acceptable.
            if (delimiters[i].match(/^\]$/) && delimiters[i + 1] && delimiters[i + 1].match(/^\[$/))
                continue;

            if (delimiters[i].match(/^\[$/) && delimiters[i - 1] && delimiters[i - 1].match(/^\]$/))
                continue;

            errorString += "\n";

            for (let a of errorString)
                errorString += " ";

            errorString = errorString.substring(0) + "\t^";

            console.warn("[Selector] Unexpected syntax on string '" + components[i] + delimiters[i] + (components[i + 1] || "") + "':\n\t" + errorString);

            return false;
        }
    }

    return true;
}


/***/ }),
/* 5 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {


const win = window || this || null;
const glob = window || global || this || null; // Eh, just use this

/* harmony default export */ __webpack_exports__["a"] = (glob);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(21)))

/***/ }),
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__grouper__ = __webpack_require__(1);



/**
 * Relates all components with each other using the rules of the delimiters.
 */
/* harmony default export */ __webpack_exports__["a"] = (function (string) {
    const   components = Object(__WEBPACK_IMPORTED_MODULE_0__grouper__["a" /* default */])(string),
            comps = components.components,

            // Return an array, as there might be separate selectors delimited
            // by a comma. Acts like boolean AND.
            trees = [comps[0]];

    let lastTree;

    for (const [index, delimiter] of components.delimiters.entries()) {

        lastTree = trees[trees.length - 1];

        // Delimiters: ',', '+', '~', '>' and ' '.
        // Link them linearly.
        if (delimiter.match(/^ $/)) {
            // Space, so link them as distant relatives.

            comps[index + 1].ancestor = lastTree;
            lastTree.descendant = comps[index + 1];
        }

        else if (delimiter.match(/^\+$/)) {
            // Plus sign links elements that are adjacent.

            comps[index + 1].beforeNeighbor = lastTree;
            lastTree.afterNeighbor = comps[index + 1];
        }

        else if (delimiter.match(/^\~$/)) {
            // Tilde links distant elements.

            comps[index + 1].beforeDistantNeighbor = lastTree;
            lastTree.afterDistantNeighbor = comps[index + 1];
        }

        else if (delimiter.match(/^\>$/)) {
            // Immediate parent/child relationship.

            comps[index + 1].parent = lastTree;
            lastTree.child = comps[index + 1];
        }

        else if (delimiter.match(/^\,$/)) {
            // New tree.

            trees.push(comps[index + 1]);
        }

        else {
            return null;
        }
    }

    return trees;
});


/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = isSubsetObject;

/**
 * Evaluates whether the first array is a subset of the second.
 * If the method is called with a callback function as the last parameter, then
 * the a subset relationship is determined by the result of the callback.
 *
 * @param arr1 - array to check for a subset relationship.
 * @param arr2 - array to check for a superset relationship.
 * @param fn - a callback function to evaluate the values between the arrays.
 * @param proper - checks for a strictly proper-subset relationship.
 * @return whether there is a subset/superset relationship between the arrays.
 */
/* unused harmony default export */ var _unused_webpack_default_export = (function (arr1, arr2, fn, proper) {
    let i = 0;

    const   hasOwn = Object.prototype.hasOwnProperty,
            keys1 = Object.keys(arr1),
            keys2 = Object.keys(arr2);

    if (keys1.length > keys2.length)
        return false;

    for (const a of keys1) {
        if (!keys2.includes(a))
            return false;

        for (const b of keys2) {
            if (!(hasOwn.call(arr1, a) && hasOwn.call(arr2, b)))
                continue;

            if ((fn && fn(arr1[a], arr2[b])) || arr1[a] === arr2[b])
                break;

            i++;
        }

        if ((proper && i >= keys2.length) ||
            (i > keys2.length))
            return false;
    }

    return true;
});

function isSubsetObject(obj1, obj2, fn, proper) {
    let i = 0;

    const   keys1 = Object.keys(obj1),
            keys2 = Object.keys(obj2);

    if (keys1.length > keys2.length)
        return false;

    for (const item of keys1) {
        if (fn) {
            for (const that of keys2) {
                if (fn(item, obj1[item], that, obj2[that]))
                    break;

                i++;
            }

            // Did not find an entry in obj1 in obj2.
            if (i >= keys2.length)
                return false;
        } else {
            if (!keys2.includes(item))
                return false;

            if (obj1[item] !== obj2[item])
                return false;
        }
    }

    return proper ? keys1.length < keys2.length : true;
}


/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(10);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_globals__ = __webpack_require__(5);




((global, Selector) => {
    if (typeof define === "function" &&
        __webpack_require__(29)) {
        define(() => {
            global.Selector = Selector;
            return global.Selector;
        });
    } else if (typeof exports === "object") {
        module.exports = Selector;
    } else {
        global.Selector = Selector;
    }
})(__WEBPACK_IMPORTED_MODULE_1__util_globals__["a" /* default */], __WEBPACK_IMPORTED_MODULE_0__core__["a" /* default */]);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(9)(module)))

/***/ }),
/* 9 */
/***/ (function(module, exports) {

module.exports = function(originalModule) {
	if(!originalModule.webpackPolyfill) {
		var module = Object.create(originalModule);
		// module.parent = undefined by default
		if(!module.children) module.children = [];
		Object.defineProperty(module, "loaded", {
			enumerable: true,
			get: function() {
				return module.l;
			}
		});
		Object.defineProperty(module, "id", {
			enumerable: true,
			get: function() {
				return module.i;
			}
		});
		Object.defineProperty(module, "exports", {
			enumerable: true,
		});
		module.webpackPolyfill = 1;
	}
	return module;
};


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_core__ = __webpack_require__(11);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__core_core__["a"]; });




/***/ }),
/* 11 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__matcher_matcher__ = __webpack_require__(12);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__tree__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__grouper__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__splitter__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_delimiterClean__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_logger__ = __webpack_require__(3);








class Selector {
    static match(string) {
        return Object(__WEBPACK_IMPORTED_MODULE_0__matcher_matcher__["a" /* default */])(string);
    }

    static tree(string) {
        try {
            return Object(__WEBPACK_IMPORTED_MODULE_1__tree__["a" /* default */])(string);
        } catch (exception) {
            console.error("[Selector] Parsing error occurred when executing tree(): " + exception);
        }
    }

    static select(string, pipeToConsole) {
        try {
            return Object(__WEBPACK_IMPORTED_MODULE_2__grouper__["a" /* default */])(string);
        } catch (exception) {
            console.error("[Selector] Parsing error:\n" + exception);
        }

        if (pipeToConsole)
            this.getLastLog().toConsole();
    }


    static getLastLog() {
        return __WEBPACK_IMPORTED_MODULE_5__util_logger__["a" /* default */].getLogger("selector");
    }

    // TODO: remove - debugging only.
    static substringer(string, regex) {
        return Object(__WEBPACK_IMPORTED_MODULE_3__splitter__["a" /* default */])(string, regex);
    }

    static tidy(components, delimiters) {
        Object(__WEBPACK_IMPORTED_MODULE_4__util_delimiterClean__["a" /* default */])(components, delimiters);

        return [components, delimiters];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Selector;



/***/ }),
/* 12 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_tree__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__core_searcher__ = __webpack_require__(17);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_tools_flatten__ = __webpack_require__(28);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_globals__ = __webpack_require__(5);






/* harmony default export */ __webpack_exports__["a"] = (function (string) {
    // Call our makeTree function to build a relationship between the elements
    // we are trying to look for in the DOM.
    const   tree = Object(__WEBPACK_IMPORTED_MODULE_0__core_tree__["a" /* default */])(string),
            doc = __WEBPACK_IMPORTED_MODULE_3__util_globals__["a" /* default */].document;

    return Object(__WEBPACK_IMPORTED_MODULE_2__util_tools_flatten__["a" /* default */])(tree.map(t => {
        console.log("Indiv:");
        console.log(t);
        return Object(__WEBPACK_IMPORTED_MODULE_1__core_searcher__["a" /* default */])(doc, t, true, []);
    }), 1);
});


/***/ }),
/* 13 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = selector;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__grouper__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__parsed__ = __webpack_require__(14);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__splitter__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_delimiterClean__ = __webpack_require__(4);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_regex__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__util_dequote__ = __webpack_require__(16);








/**
 * Parses a CSS selector string into a workable tree.
 * Would parse a string like: "tag#id.class".
 *
 * @return an object containing the parts of the selector.
 */
function selector(string) {
    const selected = Object(__WEBPACK_IMPORTED_MODULE_1__parsed__["a" /* default */])();

    let parts, delimiters,
        cursor = 0,
        components = Object(__WEBPACK_IMPORTED_MODULE_2__splitter__["a" /* default */])(string, __WEBPACK_IMPORTED_MODULE_4__util_regex__["a" /* rSelectorConstructs */]);

    if (!Object(__WEBPACK_IMPORTED_MODULE_3__util_delimiterClean__["b" /* delimiterValidator */])(components.sub, components.delimiters)) {
        return;
    }

    console.log(components.sub);
    console.log(components.delimiters);

    parts = components.sub;
    delimiters = components.delimiters;

    // Check each delimiter with its respective string.
    // tag
    if (parts[0]) {
        if (!selected.tag)
            selected.tag = parts[0];
        else
            return;
    }

    for (let i = 0; i < delimiters.length; i++) {
        // classes
        if (delimiters[i].match(/^\.$/)) {
            selected.classes.push(parts[i + 1]);
        }

        // id
        else if (delimiters[i].match(/^\#$/)) {
            if (!selected.id)
                selected.id = parts[i + 1];
            else
                return;
        }

        else if (delimiters[i].match(/^\[$/)) {
            // Check if there is a closing brace.
            if (delimiters[i + 1] && delimiters[i + 1] !== "]")
                return;

            if (parts[i + 1]) {
                // Take out the attribute.
                let lastCharacter, join, sub,
                    attr = selected.attributes,
                    split = parts[i + 1].split(/=/),
                    first = split[0];

                if (split.length === 1) {
                    // Then there is only the attribute.
                    attr.has.push(first);
                } else {
                    join = Object(__WEBPACK_IMPORTED_MODULE_5__util_dequote__["a" /* default */])(split.slice(1).join("="));
                    lastCharacter = first.charAt(first.length - 1);
                    sub = first.substring(0, first.length - 1);

                    // Switch cases for the type of match.
                    if (lastCharacter.match(/^\*$/)) {
                        // Split by "=", so join the strings again with "=".
                        if (!attr.contains[sub])
                            attr.contains[sub] = join;
                    }

                    else if (lastCharacter.match(/^\~$/)) {
                        attr.matchSpaces[sub] = join;
                    }

                    else if (lastCharacter.match(/^\|$/)) {
                        attr.matchDashes[sub] = join;
                    }

                    else if (lastCharacter.match(/^\^$/)) {
                        if (!attr.startsWith)
                            attr.startsWith = join;
                    }

                    else if (lastCharacter.match(/^\$$/)) {
                        if (!attr.endsWith)
                            attr.endsWith = join;
                    }

                    else {
                        // Finally, if no match, then we seek an exact match.
                        if (!attr.match[first]) {
                            attr.match[first] = join;
                        }
                    }
                }
            }
        }
    }

    return selected;
}


/***/ }),
/* 14 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_deepCopy__ = __webpack_require__(15);



let parsed = {
    // An ancestor, but not necessarily a direct ancestor.
    ancestor: null,

    // A descendant, but not necessarily a direct descendant.
    descendant: null,

    // An immediate ancestor.
    parent: null,

    // An immediate descendant.
    child: null,

    // Before Neighbor: adjacent only
    beforeNeighbor: null,

    // After Neighbor: adjacent only
    afterNeighbor: null,

    beforeDistantNeighbor: null,

    afterDistantNeighbor: null,

    tag: "",
    id: "",
    classes: [],
    attributes: {
        // [attribute=match]
        match: {},

        // [attribute*=match]
        contains: {},

        // [attribute~=match]
        matchSpaces: {},

        // [attribute|=match]
        matchDashes: {},

        // [attribute^=match]
        startsWith: null,

        // [attribute$=match]
        endsWith: null,

        // [attribute]
        has: []
    }
};

/* harmony default export */ __webpack_exports__["a"] = (function () {
    return Object(__WEBPACK_IMPORTED_MODULE_0__util_deepCopy__["a" /* deepMergeObject */])({}, parsed);
});;


/***/ }),
/* 15 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* unused harmony export isDeepCopy */
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return deepMergeObject; });
/* unused harmony export deepMergeArray */
/**
 * Deep Copyer
 * Performs a deep copy on object literals and arrays and covers all nested
 * object literals and arrays.
 * @author Benjamin Huang
 */



const toStr = Object.prototype.toString;

/**
 * Checks whether an object literal or array is a "deep copy" with another
 * specified object literal or array.
 * @param   a - an object literal or an array.
 * @param   b - an object literal or an array to compare with.
 * @return  returns true if all values and nested items are clones of each
 *          other. Returns false otherwise.
 */
function isDeepCopy(a, b) {
    for (const c in a) {
        if (toStr.call(a[c]) === "[object Object]" ||
            toStr.call(a[c]) === "[object Array]") {
            if (!b[c] || a[c] === b[c]) {
                return false;
            }

            return isDeepCopy(a[c], b[c]);
        }

        if (a[c] !== b[c])
            return false;
    }

    return true;
}

/**
 * Copies all values and nested items from all specified sources into a target.
 * @param   target - the object literal to copy the values of all
 *          sources into.
 * @param   ...sources - one or more object literals to copy values to the
 *          target. Repeated values are overridden.
 * @return  Returns the target object literal.
 */
function deepMergeObject(target, ...sources) {
    let src;

    for (const i of sources)
        if (toStr.call(target) !== "[object Object]" ||
            toStr.call(i) !== "[object Object]")
            return;

    for (const source of sources) {
        for (const item in source) {
            src = source[item];
            target[item] =  toStr.call(src) === "[object Object]" ?
                            Object.assign({}, deepMergeObject({}, src)) : (
                                toStr.call(src) === "[object Array]" ?
                                deepMergeArray([], src) :
                                source[item]);
        }
    }

    return target;
}

/**
 * Copies all values and nested items from all specified sources into a target.
 * @param   target - the array to copy the values of all
 *          sources into.
 * @param   ...sources - one or more arrays to copy values to the
 *          target. Repeated values are overridden.
 * @return  Returns the target array.
 */
function deepMergeArray(target, ...sources) {
    for (const i of sources)
        if (toStr.call(target) !== "[object Array]" ||
            toStr.call(i) !== "[object Array]")
            return;

    for (const source of sources) {
        for (const item of source) {
            target.push(
                toStr.call(item) === "[object Array]" ?
                deepMergeArray([], item) : (
                    toStr.call(item) === "[object Object]" ?
                    deepMergeObject({}, item) :
                    item)
            );
        }
    }

    return target;
}




/***/ }),
/* 16 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = (function (string) {
    // Strip quotes if and only if the string is encased in quotes.
    let str = string.trim();

    if (str.match(/^\".*\"$/))
        return str.substring(1, str.length - 1);

    return string;
});


/***/ }),
/* 17 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = searcher;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__searchRoutine__ = __webpack_require__(18);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_globals__ = __webpack_require__(5);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__matches_matches__ = __webpack_require__(22);





/**
 * Starting from a root element, the method recursively attempts to match
 * all match criteria from the buildSearchRoutine method. Performs a pre-order
 * traversal of the DOM sub-tree with the root at some element in the DOM.
 *
 * @param root - the starting point of the search.
 * @param search - a search tree derived from "../core/parsed.js".
 * @param depthSearch - if false, returns whether the root matches the search
 *                      tree.
 * @param selected - an array to store selected elements.
 *
 * @return returns @param selected.
 */
function searcher(root, search, depthSearch, selected) {
    if (depthSearch) {
        for (const child of root.children) {
            // Only check the properties that are in the search criteria.
            // Ignore them if they are omitted; assume they match.

            console.log("Checking " + child);
            console.log("Tree: ");
            console.log(search);

            const routine = new __WEBPACK_IMPORTED_MODULE_0__searchRoutine__["a" /* default */](search);

            if (routine.run(child, __WEBPACK_IMPORTED_MODULE_2__matches_matches__["a" /* default */]))
                selected.push(child);

            // Recurse to search all children.
            searcher(child, search, depthSearch, selected);
        }

        return selected;
    }

    // If depthSearch is false, then just check if the root matches the routine.
    return new __WEBPACK_IMPORTED_MODULE_0__searchRoutine__["a" /* default */](search).run(root, __WEBPACK_IMPORTED_MODULE_2__matches_matches__["a" /* default */]);
}


/***/ }),
/* 18 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__buildSearchRoutine__ = __webpack_require__(19);



/* harmony default export */ __webpack_exports__["a"] = (class {
    constructor(searchTree) {
        this.routine = Object(__WEBPACK_IMPORTED_MODULE_0__buildSearchRoutine__["a" /* default */])(searchTree);
    }

    run(element, functionNamespace) {
        if (!this.routine)
            return;

        let str,
            matched = 0;

        for (const instruction of this.routine) {
            str = "match" + instruction.formatted;

            if (functionNamespace[str] && functionNamespace[str](element, instruction.value))
                matched++;
        }

        return matched === this.routine.length;
    }
});


/***/ }),
/* 19 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_tools_isEmptyObject__ = __webpack_require__(20);



/**
 * Breaks down a search tree to the individual criteria to search for in
 * the DOM.
 */
/* harmony default export */ __webpack_exports__["a"] = (function (search) {
    let routine = [];

    for (const term of Object.keys(search)) {
        /*console.log("Term " + term);
        console.log(search[term]);
        console.log(!!search[term]);*/
        if (!search[term] || Object(__WEBPACK_IMPORTED_MODULE_0__util_tools_isEmptyObject__["a" /* default */])(search[term]))
            continue;

        if (Object.prototype.toString.call(search[term]) === "[object Object]" &&
            term === "attributes") {
            for (const a of Object.keys(search[term])) {
                if (!search[term][a] || Object(__WEBPACK_IMPORTED_MODULE_0__util_tools_isEmptyObject__["a" /* default */])(search[term][a]))
                    continue;

                routine.push({
                    depth: search[term],
                    property: a,
                    value: search[term][a],
                    formatted: format(term) + format(a)
                });
            }
        } else {
            routine.push({
                depth: search,
                property: term,
                value: search[term],
                formatted: format(term)
            });
        }
    }

    return routine;
});

/**
 * Formats an attribute string so that we can work with it.
 */
function format(string) {
    return string.split(/[-_]+/).map(v => v ? v.charAt(0).toUpperCase() + (v.length > 1 ? v.substring(1) : "") : "").join("");
}


/***/ }),
/* 20 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = (function (object) {
    return  (object.constructor === [].constructor || object.constructor === {}.constructor) &&
            Object.keys(object).length === 0;
});


/***/ }),
/* 21 */
/***/ (function(module, exports) {

var g;

// This works in non-strict mode
g = (function() {
	return this;
})();

try {
	// This works if eval is allowed (see CSP)
	g = g || Function("return this")() || (1,eval)("this");
} catch(e) {
	// This works if the window reference is available
	if(typeof window === "object")
		g = window;
}

// g can still be undefined, but nothing to do about it...
// We return undefined, instead of nothing here, so it's
// easier to handle this case. if(!global) { ...}

module.exports = g;


/***/ }),
/* 22 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__classList__ = __webpack_require__(23);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__id__ = __webpack_require__(24);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__tag__ = __webpack_require__(25);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__matches_attribute__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__contains_attribute__ = __webpack_require__(27);







/* harmony default export */ __webpack_exports__["a"] = ({
    matchId: __WEBPACK_IMPORTED_MODULE_1__id__["a" /* default */],
    matchTag: __WEBPACK_IMPORTED_MODULE_2__tag__["a" /* default */],
    matchClass: __WEBPACK_IMPORTED_MODULE_0__classList__["a" /* default */],
    matchAttributeMatches: __WEBPACK_IMPORTED_MODULE_3__matches_attribute__["a" /* default */],
    matchAttributeContains: __WEBPACK_IMPORTED_MODULE_4__contains_attribute__["a" /* default */]
});


/***/ }),
/* 23 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/**
 * Checks if an element's classList contains all the classes in the
 * search criteria.
 */
/* harmony default export */ __webpack_exports__["a"] = (function (element, classListArray) {
    for (const cl of classListArray)
        if (!element.classList.contains(cl))
            return false;

    return true;
});


/***/ }),
/* 24 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = (function (element, id) {
    return element.id === id;
});


/***/ }),
/* 25 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/* harmony default export */ __webpack_exports__["a"] = (function (element, tag) {
    console.log("checking tag");

    return element.tagName.toLowerCase() === tag.toLowerCase();
});


/***/ }),
/* 26 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_isSubset__ = __webpack_require__(7);



/**
 * matches.attribute.js
 * [attribute=value].
 */
/* harmony default export */ __webpack_exports__["a"] = (function (element, attributeMatchesObject) {
    // NamedNodeMap does not have a method to verify the existence of
    // an item, so use our subset checker.

    // Use our subset checker to check for a subset relationship.
    return Object(__WEBPACK_IMPORTED_MODULE_0__util_isSubset__["a" /* isSubsetObject */])(attributeMatchesObject, element.attributes, (a, b, c, d) => {
        return d.name === a && d.value === b;
    });
});


/***/ }),
/* 27 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_isSubset__ = __webpack_require__(7);



/**
 * contains.attribute.js
 * [attribute*=value]
 */
/* harmony default export */ __webpack_exports__["a"] = (function (element, attributeContainsObject) {
    // Use the subset checker tool.
    return Object(__WEBPACK_IMPORTED_MODULE_0__util_isSubset__["a" /* isSubsetObject */])(attributeContainsObject, element.attributes, (a, b, c, d) => {
        return d.name === a && d.value.indexOf(b) !== -1;
    });
});


/***/ }),
/* 28 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";

/**
 * 'Flattens' an array.
 */
/* harmony default export */ __webpack_exports__["a"] = (function (array, depth) {
    return flatten(array, depth, 0);
});

function flatten(array, depth = 0, currentDepth = 0) {
    if (depth && depth !== 0, currentDepth > depth)
        return array;

    if (array.length === 1)
        return isArray(array[0]) ? flatten(array[0], depth, currentDepth + 1) : array;

    return  isArray(array[0]) ?
            flatten(array[0], depth, currentDepth + 1).concat(flatten(array.slice(1), depth, currentDepth + 1)) :
            [array[0]].concat(flatten(array.slice(1), depth, currentDepth + 1));
}

function isArray(array) {
    return Object.prototype.toString.call(array) === "[object Array]";
}


/***/ }),
/* 29 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ })
/******/ ]);