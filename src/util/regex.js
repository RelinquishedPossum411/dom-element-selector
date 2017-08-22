
const   rSpecialCharacters = /[!"#$%&'()+,./:;<=>?@[\]^`{|}~ ]/,
        rSpecialSeparators = /[>+~,\s]/,
        rWhitespace = /\s/,
        rStringWhitespace = /^\s$/,
        rSelectorConstructs = /[\[\]#:.+]/,
        rSelectAll = /[*]/,
        rParenthesis = /[\(\)]/;

export {
    rSpecialCharacters,
    rSpecialSeparators,
    rWhitespace,
    rStringWhitespace,
    rSelectorConstructs,
    rParenthesis
};
