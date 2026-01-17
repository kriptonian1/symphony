import { log, outro } from "@clack/prompts";
import {
	ElementNotFoundError,
	FailedAssertionError,
	WorkflowSyntaxError,
} from "@src/errors/workflow-error";
import chalk from "chalk";

/**
 * Handles errors that occur during workflow execution by logging appropriate messages
 * and terminating the process with an exit code of 1.
 *
 * - If the error is a `WorkflowSyntaxError`, logs a validation error message and prompts the user to fix the YAML syntax.
 * - If the error is an `ElementNotFoundError`, logs a failure message with the error details.
 * - For all other errors, logs a generic unexpected error message and outputs the error.
 *
 * @param error - The error object thrown during workflow execution. Can be of any type.
 */
export function handleWorkflowError(error: unknown) {
	if (error instanceof WorkflowSyntaxError) {
		log.error(chalk.red("Workflow stopped due to validation error"));
		outro(
			chalk.red(
				"Please fix the syntax error in your YAML file and try again.\n",
			),
		);
	} else if (error instanceof ElementNotFoundError) {
		outro(chalk.red(`✖ Workflow Failed: ${error.message}`));
	} else if (error instanceof FailedAssertionError) {
		outro(chalk.red(`✖ Workflow Failed: ${error.message}`));
	} else {
		log.error(chalk.red("An unexpected error occurred."));
		console.error("Workflow failed:", error);
		outro(chalk.red("✖ Workflow failed unexpectedly."));
	}
	process.exit(1);
}
