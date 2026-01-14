

import { Meta } from "../../json-schema-meta.ts";

export const colorModeMeta: Meta = {
	title: "Color Mode",
	description:
		"Preferred color scheme for the target website during workflow execution. Set to 'light' or 'dark' to ensure consistent UI appearance across different systems. Defaults to 'light' if not specified.",
	enumDescriptions: ["Light mode", "Dark mode"],
};




export const flowMeta: Meta = {
	title: "Workflow Flow Steps",
	description:
		"Ordered sequence of browser automation steps (clicks, inputs, scrolling, keyboard actions, waits, etc.) that define the complete workflow execution path.",
};





export const nameMeta: Meta = {
	title: "Workflow Name",
	description:
		"Name of your workflow. Symphony will display the name when running the workflow.",
};





export const urlMeta: Meta = {
	title: "Target Website URL",
	description:
		"Target website URL where this workflow will be executed. This determines the starting page for all automation steps in the flow.",
};