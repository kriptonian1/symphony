import { ElementNotFoundError } from "@src/errors/workflow-error";
import type { BaseFlowParam } from "@type/base-flow.types";
import type { ClickAction } from "@type/workflow-config.types";
import type { Locator } from "playwright";
import { createFlow } from "./create-flow";

function clickOnDescription({
	step,
}: Pick<BaseFlowParam<ClickAction>, "step">) {
	let targetDescription: `text: ${string}` | `selector: ${string}`;
	if (typeof step.clickOn === "string") {
		targetDescription = `text: ${step.clickOn}`;
	} else {
		targetDescription = `selector: ${step.clickOn.selector}`;
	}
	return targetDescription;
}

export default createFlow<ClickAction>({
	action: "clickOn",

	getMessage: (step) => {
		const targetDescription = clickOnDescription({ step });
		return `Clicking on element with ${targetDescription}`;
	},

	execute: async ({ step: clickOnStep, page }) => {
		let targetLocator: Locator;

		if (typeof clickOnStep.clickOn === "string") {
			targetLocator = page.getByText(clickOnStep.clickOn).first();
		} else {
			targetLocator = page.locator(clickOnStep.clickOn.selector);
		}

		await targetLocator.click();
	},

	getSuccessMessage: (step) => {
		const targetDescription = clickOnDescription({ step });
		return `Clicked on element with ${targetDescription}`;
	},

	getErrorMessage: (step) => {
		const targetDescription = clickOnDescription({ step });
		return `clickOn: Unable to find element with ${targetDescription}`;
	},

	onError: (_, step) => {
		const targetDescription = clickOnDescription({ step });
		throw new ElementNotFoundError(`Element missing: ${targetDescription}`);
	},
});
