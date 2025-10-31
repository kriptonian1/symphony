import { spinner } from "@clack/prompts";
import type { ClickAction } from "@type/workflowConfig.types";
import chalk from "chalk";
import type { Page } from "playwright";

export default async function clickonExecutionFlow(
	clickOnStep: ClickAction,
	page: Page,
): Promise<void> {
	const clickSpinner = spinner();
	if (typeof clickOnStep.clickOn === "string") {
		clickSpinner.start(`Clicking: ${clickOnStep.clickOn}`);
		await page.getByText(clickOnStep.clickOn).first().click();
		clickSpinner.stop(`${chalk.green("✓")} Clicked: ${clickOnStep.clickOn}`);
	} else {
		const clickSelector = clickOnStep.clickOn.selector;
		clickSpinner.start(`Clicking: ${clickSelector}`);
		await page.click(clickSelector);
		clickSpinner.stop(`${chalk.green("✓")} Clicked: ${clickSelector}`);
	}
}
