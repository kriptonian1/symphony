/**
 * Represents an error specific to workflow operations.
 * Extends the built-in `Error` class to provide a custom error type for workflow-related issues.
 *
 * @remarks
 * This error can be thrown when a workflow encounters an exceptional condition.
 *
 * @example
 * ```typescript
 * throw new WorkflowError("Invalid workflow state");
 * ```
 *
 * @param message - A descriptive error message explaining the workflow error.
 */
export class WorkflowError extends Error {
	constructor(message: string) {
		super(message);
		this.name = this.constructor.name;
	}
}

/**
 * Represents an error thrown when there is a syntax issue in a workflow.
 * Extends the {@link WorkflowError} class to provide more specific error handling
 * for workflow syntax-related problems.
 */
export class WorkflowSyntaxError extends WorkflowError {}

/**
 * Represents an error thrown when a specific element is not found in a workflow.
 * Extends the {@link WorkflowError} class to provide more specific error handling
 * for cases where an expected element is missing.
 */
export class ElementNotFoundError extends WorkflowError {}

/**
 * Error thrown when a workflow assertion fails.
 *
 * Extends {@link WorkflowError} to represent assertion failures within workflow execution.
 */
export class FailedAssertionError extends WorkflowError {}
