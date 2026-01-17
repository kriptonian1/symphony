import { FailedAssertionError } from "@src/errors/workflow-error";
import type { IsURLAction } from "@type/workflow-config.types";
import regexOrStringMaker from "@utils/regex-or-string-maker";
import { expect } from "playwright/test";
import { createFlow } from "./create-flow";

const isURLFlow = createFlow<IsURLAction>({
	action: "isURL",

	getMessage(step) {
		const { value: titleOrRegex } = regexOrStringMaker(step.isURL);
		return `Checking visibility of page URL ${titleOrRegex}`;
	},

	async execute({ page, step }) {
		const { value: titleOrRegex } = regexOrStringMaker(step.isURL);
		await expect(page).toHaveURL(titleOrRegex);
	},

	getSuccessMessage(step) {
		const { isRegex, value: titleOrRegex } = regexOrStringMaker(step.isURL);
		const LocatorDescription = isRegex ? "Regex:" : "URL:";

		return `Page URL is visible with ${LocatorDescription} "${titleOrRegex}"`;
	},

	getErrorMessage(step) {
		const { isRegex, value: titleOrRegex } = regexOrStringMaker(step.isURL);
		const LocatorDescription = isRegex ? "Regex:" : "URL:";
		return `isURL: Page URL is not visible with ${LocatorDescription} "${titleOrRegex}"`;
	},

	onError(_, step) {
		const { value: titleOrRegex } = regexOrStringMaker(step.isURL);
		throw new FailedAssertionError(`Assertion failed: ${titleOrRegex}`);
	},
});

export default isURLFlow;
