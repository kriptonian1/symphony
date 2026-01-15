import type { StepKeys } from "@src/execution-flow/flow-registry";
import type { Page } from "playwright";
import type { FlowStep } from "./workflow-config.types";

export type BaseFlowParam<T extends FlowStep> = {
	step: T;
	page: Page;
};

// extracts Step from FlowStep
export type ActionForKey<K extends StepKeys> = Extract<
	FlowStep,
	{ [P in K]: unknown }
>;

export type FlowHandler<K extends StepKeys> = (
	params: BaseFlowParam<ActionForKey<K>>,
) => Promise<void>;
