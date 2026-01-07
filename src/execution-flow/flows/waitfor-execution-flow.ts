import { spinner } from "@clack/prompts";
import type { WaitForAction } from "@type/workflowConfig.types";
import chalk from "chalk";
import type { Page } from "playwright";

export default async function waitforExecutionFlow(
	waitforStep: WaitForAction,
	page: Page,
): Promise<void> {
	const waitForSpinner = spinner();
	waitForSpinner.start(`Waiting for: ${waitforStep.waitFor.duration}ms`);
	await page.waitForTimeout(waitforStep.waitFor.duration);
	waitForSpinner.stop(
		`${chalk.green("✓")} Waited for: ${waitforStep.waitFor.duration}ms`,
	);
}
