
import matchClassList from "./classList";
import matchId from "./id";
import matchTag from "./tag";

import matchParent from "./parent";
import matchAncestor from "./ancestor";
import matchOlderSibling from "./olderSibling";
import matchOlderDistantSibling from "./olderDistantSibling";

import attributeMatches from "./matches.attribute";
import attributeContains from "./contains.attribute";
import attributeStartsWith from "./startsWith.attribute";
import attributeEndsWith from "./endsWith.attribute";
import attributeSpaces from "./spaces.attribute";
import attributeDashes from "./dashes.attribute";
import attributeHas from "./has.attribute";

export default {
    matchId: matchId,
    matchTag: matchTag,
    matchClass: matchClassList,
    matchParent: matchParent,
    matchAncestor: matchAncestor,
    matchOlderSibling: matchOlderSibling,
    matchOlderDistantSibling: matchOlderSibling,
    matchAttributesMatches: attributeMatches,
    matchAttributesContains: attributeContains,
    matchAttributesStartsWith: attributeStartsWith,
    matchAttributesEndsWith: attributeEndsWith,
    matchAttributesSpaces: attributeSpaces,
    matchAttributesDashes: attributeDashes,
    matchAttributesHas: attributeHas
};
