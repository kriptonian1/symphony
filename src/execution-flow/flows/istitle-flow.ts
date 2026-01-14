import { spinner } from "@clack/prompts";
import { FailedAssertionError } from "@src/errors/workflow-error";
import type { BaseFlowParam } from "@type/base-flow.types";
import type { IsTitleAction } from "@type/workflow-config.types";
import regexOrStringMaker from "@utils/regex-or-string-maker";
import chalk from "chalk";
import { expect } from "playwright/test";

export default async function isTitleFlow({
	step: isTitleStep,
	page,
}: BaseFlowParam<IsTitleAction>) {
	const isTitleSpinner = spinner();

	const { isRegex, value: titleOrRegex } = regexOrStringMaker(
		isTitleStep.isTitle,
	);

	const LocatorDescription = isRegex ? "Regex:" : "Text:";

	isTitleSpinner.start(`Checking visibility of page title ${titleOrRegex}`);

	try {
		await expect(page).toHaveTitle(titleOrRegex);
		isTitleSpinner.stop(
			`${chalk.green("✓")} Page title is visible with ${LocatorDescription} "${titleOrRegex}"`,
		);
	} catch {
		isTitleSpinner.stop(
			`${chalk.red("✖")} isTitle: Page title is not visible with ${LocatorDescription} "${titleOrRegex}"`,
		);
		throw new FailedAssertionError(`Assertion failed: ${titleOrRegex}`);
	}
}
