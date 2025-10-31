import { type FlowStep, FlowStepSchema } from "@type/workflowConfig.types";
import type { Page } from "playwright";
import z from "zod";
import clickonExecutionFlow from "./clickonExecutionFlow";
import inputExecutionFlow from "./inputExecutionFlow";
import keyboardExecutionFlow from "./keyboardExecutionFlow";
import scrollExecutionFlow from "./scrollExecutionFlow";
import waitforExecutionFlow from "./waitforExecutionFlow";

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

	if ("input" in step) {
		await inputExecutionFlow(step, page);
	}

	if ("clickOn" in step) {
		await clickonExecutionFlow(step, page);
	}

	if ("waitFor" in step) {
		await waitforExecutionFlow(step, page);
	}

	if ("keyboard" in step) {
		await keyboardExecutionFlow(step, page);
	}
	if ("scroll" in step) {
		await scrollExecutionFlow(step, page);
	}
}
