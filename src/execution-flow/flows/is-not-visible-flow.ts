import { spinner } from "@clack/prompts";
import { FailedAssertionError } from "@src/errors/workflow-error";
import type { BaseFlowParam } from "@type/base-flow.types";
import type { IsNotVisibleAction } from "@type/workflow-config.types";
import chalk from "chalk";
import type { Locator } from "playwright";
import { expect } from "playwright/test";

export default async function isNotVisibleFlow({
	step: isNotVisibleStep,
	page,
}: BaseFlowParam<IsNotVisibleAction>) {
	const isNotVisibleSpiner = spinner();

	let targetLocator: Locator;
	let targetDescription: `text: ${string}` | `selector: ${string}`;

	if (typeof isNotVisibleStep.isNotVisible === "string") {
		targetLocator = page.getByText(isNotVisibleStep.isNotVisible).first();
		targetDescription = `text: ${isNotVisibleStep.isNotVisible}`;
	} else {
		targetLocator = page.locator(isNotVisibleStep.isNotVisible.selector);
		targetDescription = `selector: ${isNotVisibleStep.isNotVisible.selector}`;
	}

	isNotVisibleSpiner.start(
		`Checking non-visibility of element with ${targetDescription}`,
	);

	try {
		await expect(targetLocator).toBeHidden();
		isNotVisibleSpiner.stop(
			`${chalk.green("✓")} Element is not visible with ${targetDescription}`,
		);
	} catch {
		isNotVisibleSpiner.stop(
			`${chalk.red("✖")} isNotVisible: Element is visible with ${targetDescription}`,
		);
		throw new FailedAssertionError(`Assertion failed: ${targetDescription}`);
	}
}
