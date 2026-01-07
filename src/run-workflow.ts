import { outro } from "@clack/prompts";
import BrowserManager from "@src/browser/browser-manager";
import { setupBrowser } from "@src/browser/setup-browser";
import { handleWorkflowError } from "@src/errors/handle-workflow-error";
import executeStep from "@src/execution-flow";
import type { BrowserEngine } from "@type/browserEngine";
import type { WorkflowConfig } from "@type/workflowConfig.types";
import chalk from "chalk";

interface BrowserOptions {
	headless: boolean;
	engine: BrowserEngine;
}

export default async function runWorkflow(
	config: WorkflowConfig,
	options: BrowserOptions,
): Promise<void> {
	const engine = new BrowserManager();
	const { page } = await setupBrowser(
		engine,
		config,
		options.headless,
		options.engine,
	);
	try {
		for (const step of config.flow) {
			await executeStep(page, step);
		}

		outro(chalk.green("✅ Workflow completed successfully!"));
	} catch (error) {
		handleWorkflowError(error);
	} finally {
		await engine.cleanup();
	}
}
