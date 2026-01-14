type RegexOrStringMakerValue =
	| { isRegex: true; value: RegExp }
	| { isRegex: false; value: string };

/**
 * Determines if the input string represents a regular expression (enclosed in slashes)
 * or a plain string, and returns an object indicating the type and value.
 *
 * @param str - The input string to evaluate. If the string starts and ends with a slash ('/'),
 *              it is treated as a regular expression; otherwise, it is treated as a plain string.
 * @returns An object containing:
 *   - `isRegex`: A boolean indicating whether the input was interpreted as a regular expression.
 *   - `value`: The corresponding RegExp object if `isRegex` is true, or the original string otherwise.
 */
export default function regexOrStringMaker(
	str: string,
): RegexOrStringMakerValue {
	if (str.startsWith("/") && str.endsWith("/")) {
		const newRegex = new RegExp(str.split("/")[1]);
		return { isRegex: true, value: newRegex };
	}
	return { isRegex: false, value: str };
}
