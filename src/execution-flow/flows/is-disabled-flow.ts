import { FailedAssertionError } from "@src/errors/workflow-error";
import type { BaseFlowParam } from "@type/base-flow.types";
import type { IsDisabledAction } from "@type/workflow-config.types";
import type { Locator } from "playwright";
import { expect } from "playwright/test";
import { createFlow } from "./create-flow";

function isDisableDescription(step: IsDisabledAction): string {
	let targetDescription: `text: ${string}` | `selector: ${string}`;

	if (typeof step.isDisabled === "string") {
		targetDescription = `text: ${step.isDisabled}`;
	} else {
		targetDescription = `selector: ${step.isDisabled.selector}`;
	}
	return targetDescription;
}

function isDisabledLocator({
	page,
	step,
}: BaseFlowParam<IsDisabledAction>): Locator {
	let targetLocator: Locator;

	if (typeof step.isDisabled === "string") {
		targetLocator = page.getByText(step.isDisabled).first();
	} else {
		targetLocator = page.locator(step.isDisabled.selector);
	}

	return targetLocator;
}

const isDisabledFlow = createFlow<IsDisabledAction>({
	action: "isDisabled",
	setLoadingMessage(step) {
		const targetDescription = isDisableDescription(step);
		return `Checking visibility of element with ${targetDescription}`;
	},
	async execute(params) {
		const targetLocator = isDisabledLocator(params);
		await expect(targetLocator).toBeDisabled();
	},
	setSuccessMessage(step) {
		const targetDescription = isDisableDescription(step);
		return `Element is disabled with ${targetDescription}`;
	},
	setErrorMessage(step) {
		const targetDescription = isDisableDescription(step);
		return `isDisabled: Element is not disabled with ${targetDescription}`;
	},
	onError(_, step) {
		const targetDescription = isDisableDescription(step);
		return new FailedAssertionError(`Assertion failed: ${targetDescription}`);
	},
});

export default isDisabledFlow;
