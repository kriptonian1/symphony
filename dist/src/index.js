"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const playwright_1 = require("playwright"); // Import Playwright
const fs_1 = __importDefault(require("fs"));
const js_yaml_1 = __importDefault(require("js-yaml"));
const ymlFile = fs_1.default.readFileSync("./youtube.yml", "utf8");
const workflowConfig = js_yaml_1.default.load(ymlFile);
// console.log(workflowConfig);
console.log("Running Test for: ", JSON.stringify(workflowConfig.name, null, 2));
(async () => {
    const browser = await playwright_1.chromium.launch({
        headless: false,
        channel: "chrome",
    });
    try {
        const context = await browser.newContext();
        const page = await context.newPage();
        await page.goto(workflowConfig.url);
        for (const step of workflowConfig.flow) {
            if (step.type === "input") {
                console.log("Running input action");
                await page.fill(step.input.selector, step.input.value);
            }
            if (step.type === "clickOn") {
                console.log("Running clickOn action");
                await page.click(step.clickOn.selector);
            }
            if (step.type === "waitFor") {
                console.log("Running waitFor action");
                await page.waitForTimeout(step.waitFor.duration);
            }
        }
    }
    catch (error) {
        console.error("Error:", error); // Log any errors
    }
    finally {
        await browser.close(); // Ensure browser is closed
        console.log("Test completed");
    }
})();
//# sourceMappingURL=index.js.map