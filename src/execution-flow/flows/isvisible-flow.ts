import { spinner } from "@clack/prompts";
import { FailedAssertionError } from "@src/errors/workflow-error";
import type { BaseFlowParam } from "@type/base-flow.types";
import type { IsVisibleAction } from "@type/workflow-config.types";
import chalk from "chalk";
import type { Locator } from "playwright";
import { expect } from "playwright/test";

export default async function isVisibleFlow({
	step: isVisibleStep,
	page,
}: BaseFlowParam<IsVisibleAction>): Promise<void> {
	const isVisibleSpiner = spinner();

	let targetLocator: Locator;
	let targetDescription: `text: ${string}` | `selector: ${string}`;

	if (typeof isVisibleStep.isVisible === "string") {
		targetLocator = page.getByText(isVisibleStep.isVisible).first();
		targetDescription = `text: ${isVisibleStep.isVisible}`;
	} else {
		targetLocator = page.locator(isVisibleStep.isVisible.selector);
		targetDescription = `selector: ${isVisibleStep.isVisible.selector}`;
	}

	isVisibleSpiner.start(
		`Checking visibility of element with ${targetDescription}`,
	);

	try {
		await expect(targetLocator).toBeVisible();
		isVisibleSpiner.stop(
			`${chalk.green("✓")} Element is visible with ${targetDescription}`,
		);
	} catch {
		isVisibleSpiner.stop(
			`${chalk.red("✖")} isVisible: Element is not visible with ${targetDescription}`,
		);
		throw new FailedAssertionError(`Assertion failed: ${targetDescription}`);
	}
}
