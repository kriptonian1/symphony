import {
	clickonFlow,
	inputFlow,
	isDisabledFlow,
	isNotVisibleFlow,
	isTitleFlow,
	isURLFlow,
	isVisibleFlow,
	keyboardFlow,
	scrollFlow,
	waitforFlow,
} from "@src/execution-flow/flows";
import type { FlowHandler } from "@type/base-flow.types";
import type { KeysOfUnion } from "@type/utils.types";
import type { FlowStep } from "@type/workflow-config.types";

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
	isVisible: isVisibleFlow,
	isTitle: isTitleFlow,
	isURL: isURLFlow,
	isNotVisible: isNotVisibleFlow,
	isDisabled: isDisabledFlow,
};
