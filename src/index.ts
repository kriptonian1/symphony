import { intro } from "@clack/prompts";
import chalk from "chalk";
import { Command } from "commander";
import { description, name, version } from "package.json";
import loadWorkflowConfig from "./loadWorkflowConfig";
import runWorkflow from "./runWorkflow";

async function main(): Promise<void> {
	const program = new Command();
	program
		.name(name)
		.description(description)
		.version(version)
		.option("-f, --file <path>", "Path to the workflow YAML file")
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
