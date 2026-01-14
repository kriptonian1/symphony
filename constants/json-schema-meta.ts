import type z from "zod";
import { is } from "zod/v4/locales";

// biome-ignore lint/suspicious/noExplicitAny: we need any type here
type Meta = Parameters<z.ZodType<any, any, any>["meta"]>[0];

// Root level metadata
export const rootMeta: Meta = {
	title: "Workflow Configuration",
	description:
		"Schema defining the structure of a workflow configuration including name, target URL, color mode, and flow steps.",
};

// ========= Core action metadata =========

const nameMeta: Meta = {
	title: "Workflow Name",
	description:
		"Name of your workflow. Symphony will display the name when running the workflow.",
};

const urlMeta: Meta = {
	title: "Target Website URL",
	description:
		"Target website URL where this workflow will be executed. This determines the starting page for all automation steps in the flow.",
};

const colorModeMeta: Meta = {
	title: "Color Mode",
	description:
		"Preferred color scheme for the target website during workflow execution. Set to 'light' or 'dark' to ensure consistent UI appearance across different systems. Defaults to 'light' if not specified.",
	enumDescriptions: ["Light mode", "Dark mode"],
};

const flowMeta: Meta = {
	title: "Workflow Flow Steps",
	description:
		"Ordered sequence of browser automation steps (clicks, inputs, scrolling, keyboard actions, waits, etc.) that define the complete workflow execution path.",
};

// ========= Input action metadata =========

const inputMeta: Meta = {
	title: "Input Action",
	description:
		"Defines an input action where a value is entered into a specified input field identified by the `selector`, `label`, `testID`, `placeholder` or `role` .",
};

const inputSelectorMeta: Meta = {
	markdownDescription:
		'Selector to identify the input field. Supports multiple locator strategies.\n\n---\n\n**Label Locator** — `label:`  \nLocates input elements by the text of the associated `<label>` or `aria-labelledby` element, or by the `aria-label` attribute.\n\n**Usage:** `label:Username`, `label:Email Address`\n\n**Example DOM:**\n```html\n<input aria-label="Username">\n<label for="email-input">Email Address:</label>\n<input id="email-input">\n```\n\n---\n\n**Test ID Locator** — `testID:`  \nLocates elements by their `data-testid` attribute. Recommended for reliable test automation.\n\n**Usage:** `testID:login-input`, `testID:search-field`\n\n**Example DOM:**\n```html\n<input data-testid="login-input" type="text">\n<input data-testid="search-field" placeholder="Search...">\n```\n\n---\n\n**Placeholder Locator** — `placeholder:`  \nLocates input elements by their `placeholder` attribute text.\n\n**Usage:** `placeholder:Enter your email`, `placeholder:Search...`\n\n**Example DOM:**\n```html\n<input placeholder="Enter your email" type="email">\n<input placeholder="Search..." type="search">\n```\n\n---\n\n**Role Locator** — `role:`  \nLocates elements by their ARIA role and optional accessible name.\n\n**Usage:** `role:textbox name="username"`, `role:searchbox`\n\n**Example DOM:**\n```html\n<input role="textbox" aria-label="username">\n<input role="searchbox" placeholder="Search products">\n```\n\n---\n\n**CSS Selector** — Direct CSS selector  \nStandard CSS selector syntax for precise element targeting.\n\n**Usage:** `#username`, `.form-input`, `input[name="email"]`\n\n**Example DOM:**\n```html\n<input id="username" type="text">\n<input class="form-input" name="email">\n```\n\n---\n\nSemantic locators (**label**, **testID**, **placeholder**, **role**) are recommended as they make tests more maintainable and align with accessibility best practices.',
	pattern:
		'^(label:[^\\s].*|testID:[^\\s].*|placeholder:[^\\s].*|role:[^\\s]+(\\s+name="[^"]+")?|[#.\\[][^\\s].*|[a-zA-Z][^\\s]*)$',
	defaultSnippets: [
		{
			label: "Label locator",
			// biome-ignore lint/suspicious/noTemplateCurlyInString: this placeholder is intended for json schema
			body: "label:${1:Username}",
			description: "Locate input by visible label or aria-label text.",
		},
		{
			label: "Test ID locator",
			// biome-ignore lint/suspicious/noTemplateCurlyInString: this placeholder is intended for json schema
			body: "testID:${1:login-input}",
			description: "Locate element by data-testid attribute.",
		},
		{
			label: "Placeholder locator",
			// biome-ignore lint/suspicious/noTemplateCurlyInString: this placeholder is intended for json schema
			body: "placeholder:${1:Search...}",
			description: "Locate input by its placeholder text.",
		},
		{
			label: "Role locator",
			// biome-ignore lint/suspicious/noTemplateCurlyInString: this placeholder is intended for json schema
			body: 'role:${1:textbox} name="${2:username}"',
			description: "Locate element by ARIA role and optional accessible name.",
		},
		{
			label: "CSS selector (ID)",
			// biome-ignore lint/suspicious/noTemplateCurlyInString: this placeholder is intended for json schema
			body: "#${1:username}",
			description: "Locate element by CSS ID selector.",
		},
		{
			label: "CSS selector (class)",
			// biome-ignore lint/suspicious/noTemplateCurlyInString: this placeholder is intended for json schema
			body: ".${1:form-input}",
			description: "Locate element by CSS class selector.",
		},
	],
};

const inputValueMeta: Meta = {
	description: "Value to be entered into the input field.",
};

// ========= ClickOn Action metadata =========

const clickOnMeta: Meta = {
	title: "ClickOn Action",
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
	title: "WaitFor Action",
	description:
		"Defines a wait action that pauses workflow execution for a specified duration in milliseconds.",
};

const waitForDurationMeta: Meta = {
	markdownDescription:
		"Duration in milliseconds to pause execution.\n\n**Usage**  \nPauses the workflow execution for the specified time period. Useful for:\n- Waiting for animations to complete\n- Allowing page content to load\n- Adding delays between rapid actions\n- Ensuring UI stability before next step\n\n**Examples**\n- `1000` — Wait for 1 second\n- `500` — Wait for 0.5 seconds\n- `3000` — Wait for 3 seconds\n- `100` — Wait for 0.1 seconds\n\n**Common Use Cases**\n```yaml\n- waitFor:\n    duration: 2000  # Wait 2 seconds for page to load\n```\n\n```yaml\n- waitFor:\n    duration: 500   # Brief pause after form submission\n```",
};

// ======== Scroll Action Metadata =========

const scrollMeta: Meta = {
	title: "Scroll Action",
	description: "Defines a horizontal or vertical scroll action on the webpage.",
};

const scrollDirectionMeta: Meta = {
	description: "Direction to scroll the webpage.",
	enumDescriptions: ["Scrolls the page upwards", "Scrolls the page downwards"],
};

const scrollSpeedMeta: Meta = {
	description:
		"Speed of the scroll action in pixels per second. Higher values result in faster scrolling. If not specified, defaults to 300 pixels per second.",
	default: 300,
};

const scrollPositionMeta: Meta = {
	description:
		"Coordinates to scroll to on the webpage. Specify `x` and `y` values representing the horizontal and vertical positions respectively.",
};

const scrollPositionXMeta: Meta = {
	description: "Horizontal position to scroll to on the webpage.",
};

const scrollPositionYMeta: Meta = {
	description: "Vertical position to scroll to on the webpage.",
};

// ======== Keyboard Action Metadata =========
const keyboardMeta: Meta = {
	title: "Keyboard Action",
	description:
		"Defines a keyboard action that simulates key presses on the webpage.",
};

const keyboardKeyMeta: Meta = {
	markdownDescription:
		"**Keyboard key or key combination.**\n\n" +
		"Supports single keys like `Enter`, `KeyA`, or `ArrowUp`, and combinations joined by `+` such as `Control+Enter`, `Shift+Alt+KeyS`, or `ControlOrMeta+KeyC`.\n\n" +
		"**Categories of valid keys:**\n\n" +
		"- **Modifier Keys** — `Shift`, `Control`, `Alt`, `Meta`, `ControlOrMeta`\n" +
		"- **Alphabetic Keys** — `KeyA` to `KeyZ`\n" +
		"- **Digit Keys** — `Digit0` to `Digit9`\n" +
		"- **Function Keys** — `F1` to `F12`\n" +
		"- **Keypad Keys** — `Numpad0` to `Numpad9`, `NumpadAdd`, `NumpadEnter`, etc.\n" +
		"- **Arrow Keys** — `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`\n" +
		"- **Editing Keys** — `Backspace`, `Enter`, `Tab`, `Delete`, `Escape`, `Space`, `Insert`\n" +
		"- **Navigation Keys** — `Home`, `End`, `PageUp`, `PageDown`\n" +
		"- **Symbol Keys** — `Minus`, `Equal`, `BracketLeft`, `BracketRight`, `Backslash`, `Semicolon`, `Quote`, `Comma`, `Period`, `Slash`\n" +
		"- **Lock Keys** — `CapsLock`, `ScrollLock`\n" +
		"- **Misc Keys** — `ContextMenu`, `Pause`, `PrintScreen`\n\n" +
		"**Examples:**\n```yaml\n- pressKey: Enter\n- pressKey: Control+KeyA\n- pressKey: Shift+Alt+KeyS\n- pressKey: ControlOrMeta+KeyC\n```",
	examples: ["Enter", "Control+KeyA", "Shift+Alt+KeyS", "ControlOrMeta+KeyC"],
	pattern:
		"^(?:Shift|Control|Alt|Meta|ControlOrMeta|Key[A-Z]|Digit[0-9]|F[1-9]|F1[0-2]|NumLock|Numpad[0-9]|Numpad(Add|Subtract|Multiply|Divide|Decimal|Enter)|Arrow(Up|Down|Left|Right)|Backspace|Tab|Enter|Delete|Escape|Space|Insert|Home|End|Page(Up|Down)|Minus|Equal|Bracket(Left|Right)|Backslash|Semicolon|Quote|Backquote|Comma|Period|Slash|CapsLock|ScrollLock|ContextMenu|Pause|PrintScreen)(?:\\+(?:Shift|Control|Alt|Meta|ControlOrMeta|Key[A-Z]|Digit[0-9]|F[1-9]|F1[0-2]|NumLock|Numpad[0-9]|Numpad(Add|Subtract|Multiply|Divide|Decimal|Enter)|Arrow(Up|Down|Left|Right)|Backspace|Tab|Enter|Delete|Escape|Space|Insert|Home|End|Page(Up|Down)|Minus|Equal|Bracket(Left|Right)|Backslash|Semicolon|Quote|Backquote|Comma|Period|Slash|CapsLock|ScrollLock|ContextMenu|Pause|PrintScreen))*$",
	defaultSnippets: [
		{
			label: "Modifier + Letter",
			// biome-ignore lint/suspicious/noTemplateCurlyInString: this placeholder is intended for json schema
			body: "${1|Shift,Control,Alt,Meta,ControlOrMeta|}+Key${2|A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z|}",
			description: "Example: Shift+KeyA",
		},
		{
			label: "Modifier + Arrow",
			// biome-ignore lint/suspicious/noTemplateCurlyInString: this placeholder is intended for json schema
			body: "${1|Shift,Control,Alt,Meta,ControlOrMeta|}+Arrow${2|Up,Down,Left,Right|}",
			description: "Example: Control+ArrowUp",
		},
		{
			label: "Function Key",
			// biome-ignore lint/suspicious/noTemplateCurlyInString: this placeholder is intended for json schema
			body: "F${1|1,2,3,4,5,6,7,8,9,10,11,12|}",
			description: "Example: F5",
		},
		{
			label: "Single Key",
			// biome-ignore lint/suspicious/noTemplateCurlyInString: this placeholder is intended for json schema
			body: "Key${1|A,B,C,D,E,F,G,H,I,J,K,L,M,N,O,P,Q,R,S,T,U,V,W,X,Y,Z|}",
			description: "Example: KeyA",
		},
	],
};

const isVisibleMeta: Meta = {
	title: "IsVisible Action",
	description:
		"Defines a visibility check action that verifies whether an element is visible on the page. Can target elements either by CSS selector or by visible text content.",
};

const isVisibleStringMeta: Meta = {
	markdownDescription:
		'**Text Content Locator** — Direct string  \nChecks visibility of elements containing the specified visible text content. Takes the first matching element.\n\n**Usage:** `"Login"`, `"Submit"`, `"padding"`\n\n**Example:**\n```yaml\n- isVisible: "Get started"  # Check if element with text "Get started" is visible',
};

const isVisibleSelectorMeta: Meta = {
	markdownDescription:
		'**CSS Selector** — `selector:` property  \nUses advanced CSS selector syntax to precisely target elements for visibility checks. Supports Playwright\'s extended CSS selectors including text matching, visibility filters, and pseudo-classes.\n\n**Standard CSS Selectors:**\n```yaml\n- isVisible:\n    selector: "#login-button"        # Check element by ID\n- isVisible:\n    selector: ".modal-header"        # Check element by class\n- isVisible:\n    selector: \'button[type="submit"]\' # Check by attribute\n```\n\n**Playwright Extended Selectors:**\n\n`:text("...")` — Match elements containing specific text\n```yaml\n- isVisible:\n    selector: \'h1:text("Latest Updates")\'  # Check h1 with exact text\n- isVisible:\n    selector: \'button:text("Sign Up")\'     # Check button containing text\n```\n\n`:has-text("...")` — Match elements with substring (case-insensitive)\n```yaml\n- isVisible:\n    selector: \'a:has-text("Get started"):visible\'  # Check visible link\n- isVisible:\n    selector: \'div:has-text("Error")\'              # Check div with "Error"\n```\n\n`:visible` — Filter to only visible elements\n```yaml\n- isVisible:\n    selector: \'button:visible\'           # Check if button is visible\n- isVisible:\n    selector: \'.notification:visible\'   # Check visible notification\n```\n\n`:has()` — Match elements containing specific descendants\n```yaml\n- isVisible:\n    selector: \'form:has(input[type="email"])\'  # Check form with email input\n```\n\n**Combining Selectors:**\n```yaml\n- isVisible:\n    selector: \'a:has-text("Get started"):visible\'  # Visible link with text\n- isVisible:\n    selector: \'div.card:has(h2:text("Title"))\'     # Card div with h2 title\n```\n\n**Common Use Cases:**\n```yaml\n# Check if success message appears\n- isVisible:\n    selector: \'.alert-success:visible\'\n\n# Verify modal is displayed\n- isVisible:\n    selector: \'#modal:has-text("Confirm")\'  \n\n# Check navigation link is visible\n- isVisible:\n    selector: \'nav a:text("Dashboard"):visible\'\n\n# Verify error message\n- isVisible: "Error: Invalid credentials"\n```\n\n**Learn More:**  \n📺 [Playwright CSS Selectors Guide](https://youtu.be/nN3bS5WJax0?si=GQ7nXW1Te5QvOn7V) — Comprehensive tutorial on Playwright\'s CSS selector capabilities\n\n**Note:** The visibility check will wait for the element to become visible (up to the default timeout) before failing, making it reliable for dynamic content that may take time to appear.',
};

const isTitleMeta: Meta = {
	title: "isTitle Action",
	description:
		"Defines a title check action that verifies whether the page title matches the expected title.",
};

const isTitleTitleOrRegexMeta: Meta = {
	markdownDescription:
		'Expected page title as a string or regular expression.\n\n**Usage**  \nChecks if the current page title matches the specified string exactly or matches the provided regular expression pattern.\n\n**Examples**\n- `"Home - My Website"` — Checks for exact title match\n- `/^Dashboard - User \\d+$/` — Checks if title matches regex pattern\n\n**Common Use Cases**\n```yaml\n- isTitle: "Login - My App"          # Exact title match\n```\n\n```yaml\n- isTitle: /^Profile - User \\w+$/    # Regex title match\n```',
};

const isURLMeta: Meta = {
	title: "isURL Action",
	description:
		"Defines a URL check action that verifies whether the current page URL matches the expected URL.",
};

const isURLTitleOrRegexMeta: Meta = {
	markdownDescription:
		'Expected page URL as a string or regular expression.\n\n**Usage**  \nChecks if the current page URL matches the specified string exactly or matches the provided regular expression pattern.\n\n**Examples**\n- `"https://example.com/home"` — Checks for exact URL match\n- `/^https:\\/\\/example\\.com\\/user\\/\\d+$/` — Checks if URL matches regex pattern\n\n**Common Use Cases**\n```yaml\n- isURL: "https://example.com/dashboard"          # Exact URL match\n```\n\n```yaml\n- isURL: /^https:\\/\\/example\\.com\\/profile\\/\\w+$/    # Regex URL match\n```',
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
		scroll: {
			description: scrollMeta,
			direction: scrollDirectionMeta,
			speed: scrollSpeedMeta,
			position: {
				description: scrollPositionMeta,
				x: scrollPositionXMeta,
				y: scrollPositionYMeta,
			},
		},
		keyboard: {
			description: keyboardMeta,
			key: keyboardKeyMeta,
		},
		isVisible: {
			description: isVisibleMeta,
			string: isVisibleStringMeta,
			selector: isVisibleSelectorMeta,
		},
		isTitle: {
			description: isTitleMeta,
			titleOrRegex: isTitleTitleOrRegexMeta,
		},
		isURL: {
			description: isURLMeta,
			titleOrRegex: isURLTitleOrRegexMeta,
		},
	},
};
