import type { Page } from "playwright";
import type { FlowStep } from "./workflow-config.types";

export type BaseFlowParam<T extends FlowStep> = {
	step: T;
	page: Page;
};
