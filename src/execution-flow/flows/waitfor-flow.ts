import type { WaitForAction } from "@type/workflow-config.types";
import { createFlow } from "./create-flow";

const waitforFlow = createFlow<WaitForAction>({
	action: "waitFor",
	setLoadingMessage(step) {
		return `Waiting for: ${step.waitFor.duration}ms`;
	},
	async execute({ step, page }) {
		await page.waitForTimeout(step.waitFor.duration);
	},
	setSuccessMessage(step) {
		return `Waited for: ${step.waitFor.duration}ms`;
	},
});

export default waitforFlow;
