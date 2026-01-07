import { Command, Option } from "commander";
import { description, version } from "package.json";

/**
 * Initializes and configures the Symphony CLI command.
 *
 * @returns {Command} The configured CLI command instance.
 */
export default function initializeCLI(): Command {
	const program = new Command();

	program.name("symphony").description(description).version(version);

	program.requiredOption(
		"-f, --file <path>",
		"Path to the workflow YAML file (required)",
	);

	program.option("--hl, --headless", "Run in headless mode", false);

	const engineOptions = new Option(
		"--be, --browser-engine <engine>",
		"Browser engine to use",
	)
		.choices(["chromium", "firefox", "webkit"])
		.default("chromium", "chromium is the default browser engine");

	program.addOption(engineOptions);

	return program;
}
