import { ElementNotFoundError } from "@src/errors/workflow-error";
import type { BaseFlowParam } from "@type/base-flow.types";
import type { ClickAction } from "@type/workflow-config.types";
import type { Locator } from "playwright";
import { createFlow } from "./create-flow";

function clickOnDescription(step: ClickAction) {
	let targetDescription: `text: ${string}` | `selector: ${string}`;
	if (typeof step.clickOn === "string") {
		targetDescription = `text: ${step.clickOn}`;
	} else {
		targetDescription = `selector: ${step.clickOn.selector}`;
	}
	return targetDescription;
}

function clickOnLocator({ page, step }: BaseFlowParam<ClickAction>): Locator {
	let targetLocator: Locator;

	if (typeof step.clickOn === "string") {
		targetLocator = page.getByText(step.clickOn).first();
	} else {
		targetLocator = page.locator(step.clickOn.selector);
	}

	return targetLocator;
}

const clickOnFlow = createFlow<ClickAction>({
	action: "clickOn",

	getMessage: (step) => {
		const targetDescription = clickOnDescription(step);
		return `Clicking on element with ${targetDescription}`;
	},

	execute: async (params) => {
		const targetLocator = clickOnLocator(params);

		await targetLocator.click();
	},

	getSuccessMessage: (step) => {
		const targetDescription = clickOnDescription(step);
		return `Clicked on element with ${targetDescription}`;
	},

	getErrorMessage: (step) => {
		const targetDescription = clickOnDescription(step);
		return `clickOn: Unable to find element with ${targetDescription}`;
	},

	onError: (_, step) => {
		const targetDescription = clickOnDescription(step);
		throw new ElementNotFoundError(`Element missing: ${targetDescription}`);
	},
});

export default clickOnFlow;
