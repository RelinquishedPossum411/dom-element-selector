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
/******/ 	return __webpack_require__(__webpack_require__.s = 4);
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
        rSelectorConstructs = /[\[\]#:.]/,
        rSelectAll = /[*]/;




/***/ }),
/* 1 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = splitter;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__util_regex__ = __webpack_require__(0);



/**
 * Splits a string about a regex, by default if no regex is specified, then
 * it will split by any 'special character.' Then all strings with escaped
 * characters are concatenated.
 */
function splitter(string, reg) {
    reg = reg ? reg : __WEBPACK_IMPORTED_MODULE_0__util_regex__["b" /* rSpecialCharacters */];

    let strIndex = -1,
        // This will keep track of how many times the first item got merged.
        mergedFirst = 0,
        delimiters = [],
        splitted = string.split(reg);

    for (let i = 0; i < splitted.length; i++) {
        strIndex += splitted[i].length + 1;

        console.log(splitted);
        console.log(delimiters);

        if (i === 0)
            continue;

        // Check previous entry, to see if the delimiting character was
        // escaped. If so, put it back.
        if (splitted[i - 1].endsWith("\\")) {
            if (i - 1 === 0)
                mergedFirst++;

            splitted.splice(i - 1, 2, splitted[i - 1].substring(0, splitted[i - 1].length - 1) + string[strIndex - splitted[i].length - 1] + splitted[i]);
            i--;
        } else {
            // If it is not escaped, record the delimiter
            delimiters.push(string[strIndex - splitted[i].length - 1]);
        }

        console.log(splitted);
    }

    return {
        sub: splitted,
        delimiters: delimiters,
        length: splitted.length,
        mergedFirst: mergedFirst
    };
}


/***/ }),
/* 2 */
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
            // Special case, so skip.
            // "#id" and ".class" are acceptable.
            if (components[i] === "" && i === 0)
                continue;

            if (i >= delimiters.length - 1 && delimiters[i].match(/\]/))
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
/* 3 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = grouper;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__selector__ = __webpack_require__(8);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__splitter__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_delimiterClean__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_regex__ = __webpack_require__(0);






/**
 * Divides the initial string into groups so that they can be parsed
 * individually.
 */
 function grouper(string) {
     let components = Object(__WEBPACK_IMPORTED_MODULE_1__splitter__["a" /* default */])(string, __WEBPACK_IMPORTED_MODULE_3__util_regex__["c" /* rSpecialSeparators */]);

     // Clean the components up.
     Object(__WEBPACK_IMPORTED_MODULE_2__util_delimiterClean__["a" /* default */])(components.sub, components.delimiters);

     return {
         components: components.sub.map((component) => {
             let tree = Object(__WEBPACK_IMPORTED_MODULE_0__selector__["a" /* default */])(component);

             if (!tree)
                throw new Error("[Selector] Parsing failed.");

            return tree;
         }),
         delimiters: components.delimiters
     };
 }


/***/ }),
/* 4 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* WEBPACK VAR INJECTION */(function(module) {/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core__ = __webpack_require__(6);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__util_globals__ = __webpack_require__(10);




((global, Selector) => {
    if (typeof define === "function" &&
        __webpack_require__(12)) {
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

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(5)(module)))

/***/ }),
/* 5 */
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
/* 6 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__core_core__ = __webpack_require__(7);
/* harmony reexport (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return __WEBPACK_IMPORTED_MODULE_0__core_core__["a"]; });




/***/ }),
/* 7 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__grouper__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__splitter__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__util_delimiterClean__ = __webpack_require__(2);





class Selector {
    static select(string) {
        try {
            return Object(__WEBPACK_IMPORTED_MODULE_0__grouper__["a" /* default */])(string);
        } catch (exception) {
            console.error("[Selector] Parsing error:\n" + exception);
            return null;
        }
    }

    // TODO: remove - debugging only.
    static substringer(string, regex) {
        return Object(__WEBPACK_IMPORTED_MODULE_1__splitter__["a" /* default */])(string, regex);
    }

    static tidy(components, delimiters) {
        Object(__WEBPACK_IMPORTED_MODULE_2__util_delimiterClean__["a" /* default */])(components, delimiters);

        return [components, delimiters];
    }
}
/* harmony export (immutable) */ __webpack_exports__["a"] = Selector;



/***/ }),
/* 8 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (immutable) */ __webpack_exports__["a"] = selector;
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__grouper__ = __webpack_require__(3);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__parsed__ = __webpack_require__(9);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__splitter__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__util_delimiterClean__ = __webpack_require__(2);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__util_regex__ = __webpack_require__(0);







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

    for (let i = 0; i < parts.length; i++) {
        // classes
        if (delimiters[i] === ".") {
            selected.classes.push(parts[i + 1]);
        }

        // id
        else if (delimiters[i] === "#") {
            if (!selected.id)
                selected.id = parts[i + 1];
            else
                return;
        }

        else if (delimiters[i] === "[") {
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
                    join = split.slice(1).join("=");
                    lastCharacter = first.charAt(first.length - 1);
                    sub = first.substring(0, first.length - 1);

                    // Switch cases for the type of match.
                    if (lastCharacter.match(/^\*$/)) {
                        // Split by "=", so join the strings again with "=".
                        attr.contains[sub] = join;
                    }

                    else if (lastCharacter.match(/^\~$/)) {
                        attr.matchSpaces[sub] = join;
                    }

                    else if (lastCharacter.match(/^\|$/)) {
                        attr.matchDashes[sub] = join;
                    }

                    else if (lastCharacter.match(/^\^$/)) {
                        attr.startsWith = join;
                    }

                    else if (lastCharacter.match(/^\$$/)) {
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
/* 9 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";


let parsed = {
    // An ancestor, but not necessarily a direct ancestor.
    ancestor: null,

    // A descendant, but not necessarily a direct descendant.
    descendant: null,

    // An immediate ancestor.
    parent: null,

    // An immediate descendant.
    child: null,
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
    return Object.create(parsed);
});;


/***/ }),
/* 10 */
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* WEBPACK VAR INJECTION */(function(global) {


const win = window || this || null;
const glob = window || global || this || null; // Eh, just use this

/* harmony default export */ __webpack_exports__["a"] = (glob);

/* WEBPACK VAR INJECTION */}.call(__webpack_exports__, __webpack_require__(11)))

/***/ }),
/* 11 */
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
/* 12 */
/***/ (function(module, exports) {

/* WEBPACK VAR INJECTION */(function(__webpack_amd_options__) {/* globals __webpack_amd_options__ */
module.exports = __webpack_amd_options__;

/* WEBPACK VAR INJECTION */}.call(exports, {}))

/***/ })
/******/ ]);