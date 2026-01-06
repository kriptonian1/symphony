import type { KeysOfUnion } from "@type/utils";
import type { FlowStep } from "@type/workflowConfig.types";
import type { Page } from "playwright-core";
import clickonExecutionFlow from "./clickonExecutionFlow";
import inputExecutionFlow from "./inputExecutionFlow";
import keyboardExecutionFlow from "./keyboardExecutionFlow";
import scrollExecutionFlow from "./scrollExecutionFlow";
import waitforExecutionFlow from "./waitforExecutionFlow";

export type stepKeys = KeysOfUnion<FlowStep>;

export const flowRegistry: Record<
	stepKeys,
	// biome-ignore lint/suspicious/noExplicitAny: Using any for dynamic function mapping
	(step: any, page: Page) => Promise<void>
> = {
	input: inputExecutionFlow,
	clickOn: clickonExecutionFlow,
	waitFor: waitforExecutionFlow,
	keyboard: keyboardExecutionFlow,
	scroll: scrollExecutionFlow,
};
