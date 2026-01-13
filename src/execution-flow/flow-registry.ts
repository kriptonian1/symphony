import type { BaseFlowParam } from "@type/base-flow.types";
import type { KeysOfUnion } from "@type/utils.types";
import type { FlowStep } from "@type/workflow-config.types";
import {
	clickonFlow,
	inputFlow,
	isVisibleFlow,
	keyboardFlow,
	scrollFlow,
	waitforFlow,
} from "./flows";

export type StepKeys = KeysOfUnion<FlowStep>;

// biome-ignore lint/suspicious/noExplicitAny: Using any for dynamic function mapping
type FlowFunction = ({ step, page }: BaseFlowParam<any>) => Promise<void>;

export const flowRegistry: Record<StepKeys, FlowFunction> = {
	input: inputFlow,
	clickOn: clickonFlow,
	waitFor: waitforFlow,
	keyboard: keyboardFlow,
	scroll: scrollFlow,
	isVisible: isVisibleFlow,
};
