import type { WorkflowConfig } from "@type/workflow-config.types";

/**
 * Parse the yml file and returns the workflow config object
 * @param filePath - Path to the yml file
 * @returns {WorkflowConfig} WorkflowConfig object
 */
export default async function loadWorkflowConfig(
	filePath: string,
): Promise<WorkflowConfig> {
	try {
		const ymlContent = await Bun.file(filePath).text();
		return Bun.YAML.parse(ymlContent) as WorkflowConfig;
	} catch {
		console.error(
			`Error: Unable to read file at path "${filePath}". Please ensure the file exists and is accessible.`,
		);
		process.exit(1);
	}
}
