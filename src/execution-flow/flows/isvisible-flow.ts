import type { BaseFlowParam } from "@type/base-flow.types";
import type { IsVisibleAction } from "@type/workflow-config.types";

export default async function isVisibleFlow({
	step: isVisibleStep,
	page: _,
}: BaseFlowParam<IsVisibleAction>): Promise<void> {
	// TODO: Implement the isVisible flow logic here
	console.log(isVisibleStep);
}
