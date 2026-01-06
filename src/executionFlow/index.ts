import { type FlowStep, FlowStepSchema } from "@type/workflowConfig.types";
import type { Page } from "playwright";
import z from "zod";
import { flowRegistry, type stepKeys } from "./flow-registry";

export default async function executeStep(
	page: Page,
	step: FlowStep,
): Promise<void> {
	const { success, error } = FlowStepSchema.safeParse(step);
	if (!success) {
		const keys = Object.keys(step).join(", ");
		console.error(`${z.prettifyError(error)}: ${keys} step is invalid`);
		throw new Error(`${keys} step is invalid`);
	}

	const stepKey = Object.keys(step)[0] as stepKeys;

	await flowRegistry[stepKey](step, page);
}
