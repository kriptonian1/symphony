import type { FlowHandler } from "@type/base-flow.types";
import type { KeysOfUnion } from "@type/utils.types";
import type { FlowStep } from "@type/workflow-config.types";
import {
	clickonFlow,
	inputFlow,
	keyboardFlow,
	scrollFlow,
	waitforFlow,
} from "./flows";

export type StepKeys = KeysOfUnion<FlowStep>;

export type FlowRegistry = {
	[K in StepKeys]: FlowHandler<K>;
};

export const flowRegistry: FlowRegistry = {
	input: inputFlow,
	clickOn: clickonFlow,
	waitFor: waitforFlow,
	keyboard: keyboardFlow,
	scroll: scrollFlow,
};
