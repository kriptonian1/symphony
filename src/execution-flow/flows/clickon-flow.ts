import { spinner } from "@clack/prompts";
import { ElementNotFoundError } from "@src/errors/workflow-error";
import type { BaseFlowParam } from "@type/base-flow.types";
import type { ClickAction } from "@type/workflow-config.types";
import chalk from "chalk";
import type { Locator } from "playwright";

export default async function clickonExecutionFlow({
	step: clickOnStep,
	page,
}: BaseFlowParam<ClickAction>): Promise<void> {
	const clickSpinner = spinner();

	let targetLocator: Locator;
	let targetDescription: `text: ${string}` | `selector: ${string}`;

	if (typeof clickOnStep.clickOn === "string") {
		targetLocator = page.getByText(clickOnStep.clickOn).first();
		targetDescription = `text: ${clickOnStep.clickOn}`;
	} else {
		targetLocator = page.locator(clickOnStep.clickOn.selector);
		targetDescription = `selector: ${clickOnStep.clickOn.selector}`;
	}

	clickSpinner.start(`Clicking on element with ${targetDescription}`);

	try {
		await targetLocator.click();
		clickSpinner.stop(
			`${chalk.green("✓")} Clicked on element with ${targetDescription}`,
		);
	} catch {
		clickSpinner.stop(
			`${chalk.red("✖")} clickOn: Unable to find element with ${targetDescription}`,
		);
		throw new ElementNotFoundError(`Element missing: ${targetDescription}`);
	}
}
