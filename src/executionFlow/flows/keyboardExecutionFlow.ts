import { spinner } from "@clack/prompts";
import type { KeyboardAction } from "@type/workflowConfig.types";
import chalk from "chalk";
import type { Page } from "playwright";

export default async function keyboardExecutionFlow(
	keyboardStep: KeyboardAction,
	page: Page,
): Promise<void> {
	const keyboardSpinner = spinner();
	keyboardSpinner.start(`Pressing key: ${keyboardStep.keyboard.key}`);
	await page.keyboard.press(keyboardStep.keyboard.key);
	keyboardSpinner.stop(
		`${chalk.green("✓")} Pressed key: ${keyboardStep.keyboard.key}`,
	);
}
