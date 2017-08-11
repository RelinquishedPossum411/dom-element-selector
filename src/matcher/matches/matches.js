
import matchClassList from "./classList";
import matchId from "./id";
import matchTag from "./tag";
import matchAttributeMatches from "./matches.attribute";
import matchAttributeContains from "./contains.attribute";

export default {
    matchId: matchId,
    matchTag: matchTag,
    matchClass: matchClassList,
    matchAttributeMatches: matchAttributeMatches,
    matchAttributeContains: matchAttributeContains
};
