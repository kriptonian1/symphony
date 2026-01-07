import { intro } from "@clack/prompts";
import chalk from "chalk";
import loadWorkflowConfig from "./load-workflow-config";
import runWorkflow from "./run-workflow";
import "playwright-core";
import initializeCLI from "./command";

async function main(): Promise<void> {
	const program = initializeCLI();
	program.parse(process.argv);

	const { file, headless, browserEngine } = program.opts();

	const config = await loadWorkflowConfig(file);
	intro(chalk.blue(` ✨ Running Workflow: ${config.name} `));
	await runWorkflow(config, { headless, engine: browserEngine });
}

main().catch((error) => {
	console.error("Fatal error:", error);
	process.exit(1);
});
