
import matchClassList from "./classList";
import matchId from "./id";
import matchTag from "./tag";
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
    matchAttributesMatches: attributeMatches,
    matchAttributesContains: attributeContains,
    matchAttributesStartsWith: attributeStartsWith,
    matchAttributesEndsWith: attributeEndsWith,
    matchAttributesSpaces: attributeSpaces,
    matchAttributesDashes: attributeDashes,
    matchAttributesHas: attributeHas
};
