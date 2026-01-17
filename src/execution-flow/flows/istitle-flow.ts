import { FailedAssertionError } from "@src/errors/workflow-error";
import type { IsTitleAction } from "@type/workflow-config.types";
import regexOrStringMaker from "@utils/regex-or-string-maker";
import { expect } from "playwright/test";
import { createFlow } from "./create-flow";

const isTitleFlow = createFlow<IsTitleAction>({
	action: "isTitle",
	async execute({ page, step }) {
		const { value: titleOrRegex } = regexOrStringMaker(step.isTitle);
		await expect(page).toHaveTitle(titleOrRegex);
	},
	setLoadingMessage(step) {
		const { value: titleOrRegex } = regexOrStringMaker(step.isTitle);
		return `Checking visibility of page title ${titleOrRegex}`;
	},
	getSuccessMessage(step) {
		const { isRegex, value: titleOrRegex } = regexOrStringMaker(step.isTitle);
		const LocatorDescription = isRegex ? "Regex:" : "Text:";
		return `Page title is visible with ${LocatorDescription} "${titleOrRegex}"`;
	},
	getErrorMessage(step) {
		const { isRegex, value: titleOrRegex } = regexOrStringMaker(step.isTitle);
		const LocatorDescription = isRegex ? "Regex:" : "Text:";
		return `isTitle: Page title is not visible with ${LocatorDescription} "${titleOrRegex}"`;
	},
	onError(_, step) {
		const { value: titleOrRegex } = regexOrStringMaker(step.isTitle);
		throw new FailedAssertionError(`Assertion failed: ${titleOrRegex}`);
	},
});
export default isTitleFlow;
