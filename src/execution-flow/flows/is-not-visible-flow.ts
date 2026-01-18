import { FailedAssertionError } from "@src/errors/workflow-error";
import type { BaseFlowParam } from "@type/base-flow.types";
import type { IsNotVisibleAction } from "@type/workflow-config.types";
import type { Locator } from "playwright";
import { expect } from "playwright/test";
import { createFlow } from "./create-flow";

function isNotVisibleDescription(
	step: IsNotVisibleAction,
): `text: ${string}` | `selector: ${string}` {
	if (typeof step.isNotVisible === "string") {
		return `text: ${step.isNotVisible}`;
	}
	return `selector: ${step.isNotVisible.selector}`;
}

function isNotVisibleLocator({
	page,
	step,
}: BaseFlowParam<IsNotVisibleAction>): Locator {
	if (typeof step.isNotVisible === "string") {
		return page.getByText(step.isNotVisible).first();
	}
	return page.locator(step.isNotVisible.selector);
}

export const isNotVisibleFlow = createFlow<IsNotVisibleAction>({
	action: "isNotVisible",

	setLoadingMessage: (step) => {
		const targetDescription = isNotVisibleDescription(step);
		return `Checking non-visibility of element with ${targetDescription}`;
	},

	execute: async ({ page, step }) => {
		const locator = isNotVisibleLocator({ page, step });
		// Usually expect(...).toBeHidden() is what we want for "isNotVisible"
		await expect(locator).toBeHidden();
	},

	setSuccessMessage: (step) => {
		const targetDescription = isNotVisibleDescription(step);
		return `Element is not visible with ${targetDescription}`;
	},

	setErrorMessage: (step) => {
		const targetDescription = isNotVisibleDescription(step);
		return `isNotVisible: Element is visible with ${targetDescription}`;
	},

	onError: (error, step) => {
		const targetDescription = isNotVisibleDescription(step);
		throw new FailedAssertionError(
			`Assertion failed: ${targetDescription}. Reason: ${error instanceof Error ? error.message : "unknown"}`,
		);
	},
});

export default isNotVisibleFlow;
