import { Command } from "commander";
import { description, version } from "package.json";

/**
 * Initializes and configures the Symphony CLI command.
 *
 * @returns {Command} The configured CLI command instance.
 */
export default function initializeCLI(): Command {
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
		);
	return program;
}
