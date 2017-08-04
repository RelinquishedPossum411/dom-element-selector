
const   rSpecialCharacters = /[!"#$%&'()+,./:;<=>?@[\]^`{|}~ ]/,
        rSpecialSeparators = /[>+~,\s]/,
        rWhitespace = /\s/,
        rStringWhitespace = /^\s$/,
        rSelectorConstructs = /[#:.]/,
        rSelectAll = /[*]/;

export {
    rSpecialCharacters,
    rSpecialSeparators,
    rWhitespace,
    rStringWhitespace,
    rSelectorConstructs
};
