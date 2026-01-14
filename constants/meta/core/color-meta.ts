

import { Meta } from "../json-schema-meta.ts";

export const colorModeMeta: Meta = {
	title: "Color Mode",
	description:
		"Preferred color scheme for the target website during workflow execution. Set to 'light' or 'dark' to ensure consistent UI appearance across different systems. Defaults to 'light' if not specified.",
	enumDescriptions: ["Light mode", "Dark mode"],
};