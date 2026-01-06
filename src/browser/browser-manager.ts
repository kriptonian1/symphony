import type { BrowserEngine } from "@type/browserEngine";
import { type Browser, chromium, firefox, webkit } from "playwright";

export default class BrowserManager {
	private browser: Browser | null = null;

	/**
	 * Loads the specified browser engine
	 * @param engine The browser engine to load (chromium, webkit, firefox)
	 * @param headless Whether to launch the browser in headless mode
	 * @returns A Promise that resolves to the launched Browser instance
	 */
	async load(engine: BrowserEngine, headless: boolean): Promise<Browser> {
		switch (engine) {
			case "chromium":
				this.browser = await chromium.launch({ headless });
				break;
			case "webkit":
				this.browser = await webkit.launch({ headless });
				break;
			case "firefox":
				this.browser = await firefox.launch({ headless });
				break;
			default:
				throw new Error(`Unsupported browser engine: ${engine}`);
		}
		return this.browser;
	}

	/**
	 * Cleans up and closes the browser if it is loaded
	 */
	async cleanup(): Promise<void> {
		if (this.browser) {
			await this.browser.close();
		}
	}
}
