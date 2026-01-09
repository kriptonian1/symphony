import { spinner } from "@clack/prompts";
import type { BaseFlowParam } from "@type/base-flow.types";
import type { KeyboardAction } from "@type/workflow-config.types";
import chalk from "chalk";

export default async function keyboardExecutionFlow({
	step: keyboardStep,
	page,
}: BaseFlowParam<KeyboardAction>): Promise<void> {
	const keyboardSpinner = spinner();
	keyboardSpinner.start(`Pressing key: ${keyboardStep.keyboard.key}`);
	await page.keyboard.press(keyboardStep.keyboard.key);
	keyboardSpinner.stop(
		`${chalk.green("✓")} Pressed key: ${keyboardStep.keyboard.key}`,
	);
}
