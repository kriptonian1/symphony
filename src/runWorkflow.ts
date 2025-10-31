import { outro, spinner } from "@clack/prompts";
import executeStep from "@src/executionFlow";
import type { BrowserEngine } from "@type/browserEngine";
import type { WorkflowConfig } from "@type/workflowConfig.types";
import chalk from "chalk";
import { type Browser, chromium, firefox, webkit } from "playwright";

function handleError(error: unknown) {
	if (error instanceof Error && error.message.includes("step is invalid")) {
		console.error("\n✖ Workflow stopped due to validation error");
		console.error(
			"Please fix the syntax error in your YAML file and try again.\n",
		);
	} else {
		console.error("Workflow failed:", error);
		throw error;
	}
}

async function browserCleanup(browser: Browser | null): Promise<void> {
	if (browser) {
		await browser.close();
	}
}

async function loadBrowserEngine(
	engine: BrowserEngine,
	headless: boolean,
): Promise<Browser> {
	switch (engine) {
		case "chromium":
			return await chromium.launch({ headless });
		case "webkit":
			return await webkit.launch({ headless });
		case "firefox":
			return await firefox.launch({ headless });
		default:
			throw new Error(`Unsupported browser engine: ${engine}`);
	}
}

export default async function runWorkflow(
	config: WorkflowConfig,
	headless: boolean,
	browserEngine: BrowserEngine,
): Promise<void> {
	let browser: Browser | null = null;

	try {
		browser = await loadBrowserEngine(browserEngine, headless);

		const context = await browser.newContext({
			colorScheme: config.colorMode,
		});
		const page = await context.newPage();

		const pageSpinner = spinner();

		pageSpinner.start(`Navigating to → ${config.url}`);
		await page.goto(config.url);
		pageSpinner.stop(`${chalk.green("✓")} Navigated to → ${config.url}`);

		for (const step of config.flow) {
			await executeStep(page, step);
		}

		outro(chalk.green("✅ Workflow completed successfully!"));
	} catch (error) {
		handleError(error);
	} finally {
		await browserCleanup(browser);
	}
}
