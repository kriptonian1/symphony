import fs from "fs/promises";
import yaml from "js-yaml";
import { WorkflowConfig } from "@type/workflowConfig.types";

/**
 * Parse the yml file and returns the workflow config object
 * @param filePath - Path to the yml file
 * @returns {WorkflowConfig} WorkflowConfig object
 */
export default async function loadWorkflowConfig(
    filePath: string
): Promise<WorkflowConfig> {
    const ymlContent = await fs.readFile(filePath, "utf8");
    return yaml.load(ymlContent) as WorkflowConfig;
}
