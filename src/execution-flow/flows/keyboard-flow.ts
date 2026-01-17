import type { KeyboardAction } from "@type/workflow-config.types";
import { createFlow } from "./create-flow";

const keyboardFlow = createFlow<KeyboardAction>({
	action: "keyboard",
	setLoadingMessage(step) {
		return `Pressing key: ${step.keyboard.key}`;
	},
	async execute({ page, step }) {
		await page.keyboard.press(step.keyboard.key);
	},
	setSuccessMessage(step) {
		return `Pressed key: ${step.keyboard.key}`;
	},
});

export default keyboardFlow;
