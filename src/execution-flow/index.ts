import { WorkflowSyntaxError } from "@src/errors/workflow-error";
import type { ActionForKey } from "@type/base-flow.types";
import { type FlowStep, FlowStepSchema } from "@type/workflow-config.types";
import type { Page } from "playwright";
import z from "zod";
import { flowRegistry, type StepKeys } from "./flow-registry";

export default async function executeStep(
	page: Page,
	step: FlowStep,
): Promise<void> {
	const { success, error } = FlowStepSchema.safeParse(step);
	if (!success) {
		const keys = Object.keys(step).join(", ");
		console.error(`${z.prettifyError(error)}: \`${keys}\` step is invalid`);
		throw new WorkflowSyntaxError(`${keys} step is invalid`);
	}

	const stepKey = Object.keys(step)[0] as StepKeys;

	await executeFlowForKey(page, step, stepKey);
}

async function executeFlowForKey<K extends StepKeys>(
	page: Page,
	step: FlowStep,
	key: K,
): Promise<void> {
	const handler = flowRegistry[key];
	await handler({ step: step as ActionForKey<K>, page });
}
