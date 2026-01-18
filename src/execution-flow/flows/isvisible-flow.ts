import { FailedAssertionError } from "@src/errors/workflow-error";
import type { BaseFlowParam } from "@type/base-flow.types";
import type { IsVisibleAction } from "@type/workflow-config.types";
import type { Locator } from "playwright";
import { expect } from "playwright/test";
import { createFlow } from "./create-flow";

function isVisibleDescription(step: IsVisibleAction): string {
	let targetDescription: `text: ${string}` | `selector: ${string}`;
	if (typeof step.isVisible === "string") {
		targetDescription = `text: ${step.isVisible}`;
	} else {
		targetDescription = `selector: ${step.isVisible.selector}`;
	}
	return targetDescription;
}

function isVisibleLocator({
	page,
	step,
}: BaseFlowParam<IsVisibleAction>): Locator {
	let targetLocator: Locator;

	if (typeof step.isVisible === "string") {
		targetLocator = page.getByText(step.isVisible).first();
	} else {
		targetLocator = page.locator(step.isVisible.selector);
	}

	return targetLocator;
}

const isVisibleFlow = createFlow<IsVisibleAction>({
	action: "isVisible",
	setLoadingMessage(step) {
		const targetDescription = isVisibleDescription(step);
		return `Checking visibility of element with ${targetDescription}`;
	},
	async execute(params) {
		const targetLocator = isVisibleLocator(params);
		await expect(targetLocator).toBeVisible();
	},
	setSuccessMessage(step) {
		const targetDescription = isVisibleDescription(step);
		return ` Element is visible with ${targetDescription}`;
	},
	setErrorMessage(step) {
		const targetDescription = isVisibleDescription(step);
		return `isVisible: Element is not visible with ${targetDescription}`;
	},
	onError(_, step) {
		const targetDescription = isVisibleDescription(step);
		return new FailedAssertionError(`Assertion failed: ${targetDescription}`);
	},
});

export default isVisibleFlow;
