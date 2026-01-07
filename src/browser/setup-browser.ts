import { spinner } from "@clack/prompts";
import type { BrowserEngine } from "@type/browserEngine";
import type { WorkflowConfig } from "@type/workflowConfig.types";
import chalk from "chalk";
import type { Browser, BrowserContext, Page } from "playwright-core";
import type BrowserManager from "./browser-manager";

export async function setupBrowser(
	engine: BrowserManager,
	config: WorkflowConfig,
	headless: boolean,
	browserEngine: BrowserEngine,
): Promise<{ browser: Browser; context: BrowserContext; page: Page }> {
	const browser = await engine.load(browserEngine, headless);

	const context = await browser.newContext({
		colorScheme: config.colorMode,
	});

	const page = await context.newPage();

	const pageSpinner = spinner();

	pageSpinner.start(`Navigating to → ${config.url}`);
	await page.goto(config.url);

	pageSpinner.stop(`${chalk.green("✓")} Navigated to → ${config.url}`);

	return { browser, context, page };
}
