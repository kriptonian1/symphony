import { spinner } from "@clack/prompts";
import type { BaseFlowParam } from "@type/base-flow.types";
import type { FlowStep } from "@type/workflow-config.types";
import chalk from "chalk";
import type { StepKeys } from "../flow-registry";

export interface FlowConfig<T extends FlowStep> {
	/** The action name (e.g., 'clickOn', 'input') */
	action: StepKeys;

	/** Generate descriptive message for spinner */
	setLoadingMessage: (step: T) => string;

	/** Core execution logic */
	execute: (params: BaseFlowParam<T>) => Promise<void>;

	/** Custom error handler */
	onError?: (error: unknown, step: T) => Error;

	/** Custom error message for stop spinner (defaults to getMessage) */
	setErrorMessage?: (step: T) => string;

	/** Custom success message for stop spinner (defaults to getMessage) */
	setSuccessMessage?: (step: T) => string;
}

export function createFlow<T extends FlowStep>({
	action,
	execute,
	setLoadingMessage: getMessage,
	setSuccessMessage: getSuccessMessage,
	onError,
	setErrorMessage: getErrorMessage,
}: FlowConfig<T>) {
	return async ({ page, step }: BaseFlowParam<T>): Promise<void> => {
		const flowSpinner = spinner();
		const message = getMessage(step);

		flowSpinner.start(message);

		try {
			await execute({ step, page });

			const successMsg = getSuccessMessage ? getSuccessMessage(step) : message;

			flowSpinner.stop(`${chalk.green("✓")} ${successMsg}`);
		} catch (error) {
			const errorMsg = getErrorMessage
				? getErrorMessage(step)
				: `${action}: ${message}`;
			flowSpinner.stop(`${chalk.red("✖")} ${errorMsg}`);

			if (onError) {
				throw onError(error, step);
			}

			throw error;
		}
	};
}
