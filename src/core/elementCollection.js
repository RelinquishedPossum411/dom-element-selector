
import matcher from "../matcher/matcher";

export default class {
	constructor(selector) {
		this.elements = matcher(selector);
	}

	[Symbol.iterator]() {
		let step = 0;

		return {
			next() {
				if (step >= this.elements.length)
					return { done: true };

				return { value: this.elements[step++] };
			}
		};
	}
}
