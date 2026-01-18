import type { BaseFlowParam } from "@type/base-flow.types";
import type { Role } from "@type/role.types";
import type { InputAction } from "@type/workflow-config.types";
import type { Locator } from "playwright";
import { createFlow } from "./create-flow";

type Action = "label" | "testID" | "placeholder" | "role" | "selector";

type InputValueProp = {
	action: Action;
	step: InputAction;
};

type InputValue =
	| { action: Exclude<Action, "role">; value: string }
	| {
			action: Extract<Action, "role">;
			value: { role: string; name: string };
	  };

function inputValue({ action, step }: InputValueProp): InputValue {
	const inputSelector = step.input.selector;

	switch (action) {
		case "label": {
			const labelText = inputSelector.replace("label:", "").trim();
			return { action: "label", value: labelText };
		}
		case "placeholder": {
			const placeholderText = inputSelector.replace("placeholder:", "").trim();
			return { action: "placeholder", value: placeholderText };
		}
		case "role": {
			const roleAndName = inputSelector.replace("role:", "").trim();
			const [role, ...nameParts] = roleAndName.split(" ");
			const name = nameParts.join(" ").replace('name="', "").replace('"', "");
			return { action: "role", value: { name, role } };
		}
		case "selector": {
			return { action: "selector", value: inputSelector };
		}
		case "testID": {
			const id = inputSelector.replace("testID:", "").trim();
			return { action: "testID", value: id };
		}
		default:
			return { action: "selector", value: inputSelector };
	}
}

function getActionType(selector: string): Action {
	if (selector.startsWith("label:")) return "label";
	if (selector.startsWith("testID:")) return "testID";
	if (selector.startsWith("placeholder:")) return "placeholder";
	if (selector.startsWith("role:")) return "role";
	return "selector";
}

function inputDescription(step: InputAction): string {
	const actionType = getActionType(step.input.selector);
	const result = inputValue({ action: actionType, step });

	switch (result.action) {
		case "label":
			return `label: ${result.value}`;
		case "testID":
			return `testID: ${result.value}`;
		case "placeholder":
			return `placeholder: ${result.value}`;
		case "role":
			return `role: ${result.value.role} and name: ${result.value.name}`;
		default:
			return `selector: ${result.value}`;
	}
}

function inputLocator({ page, step }: BaseFlowParam<InputAction>): Locator {
	const actionType = getActionType(step.input.selector);
	const result = inputValue({ action: actionType, step });

	switch (result.action) {
		case "label":
			return page.getByLabel(result.value);
		case "testID":
			return page.getByTestId(result.value);
		case "placeholder":
			return page.getByPlaceholder(result.value);
		case "role":
			return page.getByRole(result.value.role as Role, {
				name: result.value.name,
			});
		default:
			return page.locator(result.value);
	}
}

export const inputFlow = createFlow<InputAction>({
	action: "input",
	async execute({ page, step }) {
		const locator = inputLocator({ page, step });
		await locator.fill(step.input.value);
	},
	setLoadingMessage(step) {
		const target = inputDescription(step);
		return `Filling input for ${target}`;
	},
});

export default inputFlow;
