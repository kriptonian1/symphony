import { spinner } from "@clack/prompts";
import { InputAction } from "@type/workflowConfig.types";
import chalk from "chalk";
import { Page } from "playwright";

export default async function inputExecutionFlow(
    inputStep: InputAction,
    page: Page
): Promise<void> {
    const inputSelector = inputStep.input.selector;
    const inputSpinner = spinner();
    inputSpinner.start(`Filling input: ${inputSelector}`);
    if (inputSelector.startsWith("label:")) {
        const labelText = inputSelector.replace("label:", "").trim();
        await page
            .getByLabel(labelText)
            .fill(inputStep.input.value)
            .then(() => {
                inputSpinner.stop(
                    `${chalk.green("✓")} Filled input for label: ${labelText}`
                );
            });
    } else if (inputSelector.startsWith("testID:")) {
        const id = inputSelector.replace("testID:", "").trim();
        await page
            .getByTestId(id)
            .fill(inputStep.input.value)
            .then(() => {
                inputSpinner.stop(
                    `${chalk.green("✓")}Filled input for testID: ${id}`
                );
            });
    } else if (inputSelector.startsWith("placeholder:")) {
        const placeholderText = inputSelector
            .replace("placeholder:", "")
            .trim();
        await page
            .getByPlaceholder(placeholderText)
            .fill(inputStep.input.value)
            .then(() => {
                inputSpinner.stop(
                    `${chalk.green(
                        "✓"
                    )} Filled input for placeholder: ${placeholderText}`
                );
            });
    } else if (inputSelector.startsWith("role:")) {
        const roleAndName = inputSelector.replace("role:", "").trim();
        const [role, ...nameParts] = roleAndName.split(" ");
        const name = nameParts.join(" ").replace('name="', "").replace('"', "");
        await page
            .getByRole(role as any, { name })
            .fill(inputStep.input.value)
            .then(() => {
                inputSpinner.stop(
                    `${chalk.green(
                        "✓"
                    )} Filled input for role: ${role} and name: ${name}`
                );
            });
    } else {
        await page
            .locator(inputSelector)
            .fill(inputStep.input.value)
            .then(() => {
                inputSpinner.stop(
                    `${chalk.green(
                        "✓"
                    )} Filled input for selector: ${inputSelector}`
                );
            });
    }
}
