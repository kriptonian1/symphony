import type z from "zod";

// biome-ignore lint/suspicious/noExplicitAny: we need any type here
type Meta = Parameters<z.ZodType<any, any, any>["meta"]>[0];

// ========= Core action metadata =========

const nameMeta: Meta = {
	description:
		"Name of your workflow. Symphony will display the name when running the workflow.",
};

const urlMeta: Meta = {
	description:
		"Target website URL where this workflow will be executed. This determines the starting page for all automation steps in the flow.",
};

const colorModeMeta: Meta = {
	description:
		"Preferred color scheme for the target website during workflow execution. Set to 'light' or 'dark' to ensure consistent UI appearance across different systems. Defaults to 'light' if not specified.",
	enumDescriptions: ["Light mode", "Dark mode"],
};

const flowMeta: Meta = {
	description:
		"Ordered sequence of browser automation steps (clicks, inputs, scrolling, keyboard actions, waits, etc.) that define the complete workflow execution path.",
};

// ========= Input action metadata =========

const inputMeta: Meta = {
	description:
		"Defines an input action where a value is entered into a specified input field identified by the `selector`, `label`, `testID`, `placeholder` or `role` .",
};

const inputSelectorMeta: Meta = {
	markdownDescription:
		'Selector to identify the input field. Supports multiple locator strategies.\n\n---\n\n**Label Locator** — `label:`  \nLocates input elements by the text of the associated `<label>` or `aria-labelledby` element, or by the `aria-label` attribute.\n\n**Usage:** `label:Username`, `label:Email Address`\n\n**Example DOM:**\n```html\n<input aria-label="Username">\n<label for="email-input">Email Address:</label>\n<input id="email-input">\n```\n\n---\n\n**Test ID Locator** — `testID:`  \nLocates elements by their `data-testid` attribute. Recommended for reliable test automation.\n\n**Usage:** `testID:login-input`, `testID:search-field`\n\n**Example DOM:**\n```html\n<input data-testid="login-input" type="text">\n<input data-testid="search-field" placeholder="Search...">\n```\n\n---\n\n**Placeholder Locator** — `placeholder:`  \nLocates input elements by their `placeholder` attribute text.\n\n**Usage:** `placeholder:Enter your email`, `placeholder:Search...`\n\n**Example DOM:**\n```html\n<input placeholder="Enter your email" type="email">\n<input placeholder="Search..." type="search">\n```\n\n---\n\n**Role Locator** — `role:`  \nLocates elements by their ARIA role and optional accessible name.\n\n**Usage:** `role:textbox name="username"`, `role:searchbox`\n\n**Example DOM:**\n```html\n<input role="textbox" aria-label="username">\n<input role="searchbox" placeholder="Search products">\n```\n\n---\n\n**CSS Selector** — Direct CSS selector  \nStandard CSS selector syntax for precise element targeting.\n\n**Usage:** `#username`, `.form-input`, `input[name="email"]`\n\n**Example DOM:**\n```html\n<input id="username" type="text">\n<input class="form-input" name="email">\n```\n\n---\n\nSemantic locators (**label**, **testID**, **placeholder**, **role**) are recommended as they make tests more maintainable and align with accessibility best practices.',
};

const inputValueMeta: Meta = {
	description: "Value to be entered into the input field.",
};

// ========= ClickOn Action metadata =========

const clickOnMeta: Meta = {
	description:
		"Defines a click action that can target elements either by CSS selector or by visible text content.",
};

const clickOnStringMeta: Meta = {
	markdownDescription:
		'Text content of the element to click.\n\n**Usage**  \nClicks on elements containing the specified visible text content.\n\n**Examples with HTML**\n- `"Login"` — Clicks elements like `<button>Login</button>` or `<a>Login</a>`\n- `"Submit"` — Clicks elements like `<input type="submit" value="Submit">` or `<button>Submit</button>`\n- `"Add to Cart"` — Clicks elements like `<button>Add to Cart</button>`\n- `"Sign Up"` — Clicks elements like `<a href="/signup">Sign Up</a>`\n\n**Common Use Cases**\n```yaml\n- clickOn: "Login"        # Click any element containing "Login" text\n```\n\n```yaml\n- clickOn: "Add to Cart"  # Click button with "Add to Cart" text\n```\n\n```yaml\n- clickOn: "Next"         # Click element containing "Next" text\n```\n\n**Note:** If multiple elements contain the same text, only the first occurrence will be clicked. For precise targeting, use CSS selectors instead.',
};

const clickOnSelectorMeta: Meta = {
	markdownDescription:
		'CSS selector to identify the clickable element.\n\n**Usage**  \nStandard CSS selector syntax to target specific elements for clicking.\n\n**Examples**\n- `#submit-btn` — Click element with ID \'submit-btn\'\n- `.nav-link` — Click element with class \'nav-link\'\n- `button[type="submit"]` — Click submit button\n- `a[href="/login"]` — Click link with specific href\n- `[data-testid="confirm-button"]` — Click element with test ID\n\n**Common Use Cases**\n```yaml\n- clickOn:\n    selector: "#login-button"  # Click login button by ID\n```\n\n```yaml\n- clickOn:\n    selector: ".modal-close"   # Click modal close button\n```\n\n```yaml\n- clickOn:\n    selector: \'button[type="submit"]\'  # Click form submit button\n```',
};

// ========= WaitFor Action metadata =========

const waitForMeta: Meta = {
	description:
		"Defines a wait action that pauses workflow execution for a specified duration in milliseconds.",
};

const waitForDurationMeta: Meta = {
	markdownDescription:
		"Duration in milliseconds to pause execution.\n\n**Usage**  \nPauses the workflow execution for the specified time period. Useful for:\n- Waiting for animations to complete\n- Allowing page content to load\n- Adding delays between rapid actions\n- Ensuring UI stability before next step\n\n**Examples**\n- `1000` — Wait for 1 second\n- `500` — Wait for 0.5 seconds\n- `3000` — Wait for 3 seconds\n- `100` — Wait for 0.1 seconds\n\n**Common Use Cases**\n```yaml\n- waitFor:\n    duration: 2000  # Wait 2 seconds for page to load\n```\n\n```yaml\n- waitFor:\n    duration: 500   # Brief pause after form submission\n```",
};

/**
 * Descriptions for JSON schema properties used in Zod schemas.
 */
export const jsonSchemaMeta = {
	name: nameMeta,
	url: urlMeta,
	colorMode: colorModeMeta,
	flow: {
		description: flowMeta,
		input: {
			description: inputMeta,
			selector: inputSelectorMeta,
			value: inputValueMeta,
		},
		clickOn: {
			description: clickOnMeta,
			string: clickOnStringMeta,
			selector: clickOnSelectorMeta,
		},
		waitFor: {
			description: waitForMeta,
			duration: waitForDurationMeta,
		},
	},
};
