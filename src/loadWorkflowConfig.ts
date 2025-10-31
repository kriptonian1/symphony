import type { WorkflowConfig } from "@type/workflowConfig.types";
import yaml from "js-yaml";

/**
 * Parse the yml file and returns the workflow config object
 * @param filePath - Path to the yml file
 * @returns {WorkflowConfig} WorkflowConfig object
 */
export default async function loadWorkflowConfig(
	filePath: string,
): Promise<WorkflowConfig> {
	const ymlContent = await Bun.file(filePath).text();
	return yaml.load(ymlContent) as WorkflowConfig;
}
