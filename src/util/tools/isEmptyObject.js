
export default function (object) {
    return  (object.constructor === [].constructor || object.constructor === {}.constructor) &&
            Object.keys(object).length === 0;
}
