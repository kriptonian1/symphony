import { spinner } from "@clack/prompts";
import type { BaseFlowParam } from "@type/base-flow.types";
import type { WaitForAction } from "@type/workflow-config.types";
import chalk from "chalk";

export default async function waitforExecutionFlow({
	step: waitforStep,
	page,
}: BaseFlowParam<WaitForAction>): Promise<void> {
	const waitForSpinner = spinner();
	waitForSpinner.start(`Waiting for: ${waitforStep.waitFor.duration}ms`);
	await page.waitForTimeout(waitforStep.waitFor.duration);
	waitForSpinner.stop(
		`${chalk.green("✓")} Waited for: ${waitforStep.waitFor.duration}ms`,
	);
}
