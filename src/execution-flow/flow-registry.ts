import type { KeysOfUnion } from "@type/utils";
import type { FlowStep } from "@type/workflow-config.types";
import type { Page } from "playwright-core";
import {
	clickonExecutionFlow,
	inputExecutionFlow,
	keyboardExecutionFlow,
	scrollExecutionFlow,
	waitforExecutionFlow,
} from "./flows";

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
