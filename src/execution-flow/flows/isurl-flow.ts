import { spinner } from "@clack/prompts";
import { FailedAssertionError } from "@src/errors/workflow-error";
import type { BaseFlowParam } from "@type/base-flow.types";
import type { IsURLAction } from "@type/workflow-config.types";
import regexOrStringMaker from "@utils/regex-or-string-maker";
import chalk from "chalk";
import { expect } from "playwright/test";

export default async function isURLFlow({
	step: isURLStep,
	page,
}: BaseFlowParam<IsURLAction>) {
	const isTitleSpinner = spinner();

	const { isRegex, value: titleOrRegex } = regexOrStringMaker(isURLStep.isURL);

	const LocatorDescription = isRegex ? "Regex:" : "URL:";

	isTitleSpinner.start(`Checking visibility of page URL ${titleOrRegex}`);

	try {
		await expect(page).toHaveURL(titleOrRegex);
		isTitleSpinner.stop(
			`${chalk.green("✓")} Page URL is visible with ${LocatorDescription} "${titleOrRegex}"`,
		);
	} catch {
		isTitleSpinner.stop(
			`${chalk.red("✖")} isTitle: Page URL is not visible with ${LocatorDescription} "${titleOrRegex}"`,
		);
		throw new FailedAssertionError(`Assertion failed: ${titleOrRegex}`);
	}
}
