import type { WorkflowConfig } from "@type/workflowConfig.types";

/**
 * Parse the yml file and returns the workflow config object
 * @param filePath - Path to the yml file
 * @returns {WorkflowConfig} WorkflowConfig object
 */
export default async function loadWorkflowConfig(
	filePath: string,
): Promise<WorkflowConfig> {
	const ymlContent = await Bun.file(filePath).text();
	return Bun.YAML.parse(ymlContent) as WorkflowConfig;
}
