import { spinner } from "@clack/prompts";
import { FailedAssertionError } from "@src/errors/workflow-error";
import type { BaseFlowParam } from "@type/base-flow.types";
import type { IsDisabledAction } from "@type/workflow-config.types";
import chalk from "chalk";
import type { Locator } from "playwright";
import { expect } from "playwright/test";

export default async function isDisabledFlow({
	step: isDisabledStep,
	page,
}: BaseFlowParam<IsDisabledAction>): Promise<void> {
	const isDisabledSpinner = spinner();
	let targetLocator: Locator;
	let targetDescription: `text: ${string}` | `selector: ${string}`;

	if (typeof isDisabledStep.isDisabled === "string") {
		targetLocator = page.getByText(isDisabledStep.isDisabled).first();
		targetDescription = `text: ${isDisabledStep.isDisabled}`;
	} else {
		targetLocator = page.locator(isDisabledStep.isDisabled.selector);
		targetDescription = `selector: ${isDisabledStep.isDisabled.selector}`;
	}

	isDisabledSpinner.start(
		`Checking visibility of element with ${targetDescription}`,
	);

	try {
		await expect(targetLocator).toBeDisabled();
		isDisabledSpinner.stop(
			`${chalk.green("✓")} Element is disabled with ${targetDescription}`,
		);
	} catch {
		isDisabledSpinner.stop(
			`${chalk.red("✖")} isDisabled: Element is not disabled with ${targetDescription}`,
		);
		throw new FailedAssertionError(`Assertion failed: ${targetDescription}`);
	}
}
