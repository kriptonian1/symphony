import { intro } from "@clack/prompts";
import chalk from "chalk";
import { Command } from "commander";
import { description, version } from "package.json";
import loadWorkflowConfig from "./loadWorkflowConfig";
import runWorkflow from "./runWorkflow";
import "playwright-core";

async function main(): Promise<void> {
	const program = new Command();
	program
		.name("symphony")
		.description(description)
		.version(version)
		.requiredOption(
			"-f, --file <path>",
			"Path to the workflow YAML file (required)",
		)
		.option("--hl, --headless", "Run in headless mode", false)
		.option(
			"--be, --browser-engine <engine>",
			"Browser engine to use (chromium, webkit, firefox)",
			"chromium",
		)
		.parse(process.argv);

	const { file, headless, browserEngine } = program.opts();

	const config = await loadWorkflowConfig(file);
	intro(chalk.blue(` ✨ Running Workflow: ${config.name} `));
	await runWorkflow(config, headless, browserEngine);
}

main().catch((error) => {
	console.error("Fatal error:", error);
	process.exit(1);
});
