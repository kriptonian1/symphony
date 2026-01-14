
import { Meta } from "../../json-schema-meta.ts";

export const clickOnStringMeta: Meta = {
    markdownDescription:
        'Text content of the element to click.\n\n**Usage**  \nClicks on elements containing the specified visible text content.\n\n**Examples with HTML**\n- `"Login"` — Clicks elements like `<button>Login</button>` or `<a>Login</a>`\n- `"Submit"` — Clicks elements like `<input type="submit" value="Submit">` or `<button>Submit</button>`\n- `"Add to Cart"` — Clicks elements like `<button>Add to Cart</button>`\n- `"Sign Up"` — Clicks elements like `<a href="/signup">Sign Up</a>`\n\n**Common Use Cases**\n```yaml\n- clickOn: "Login"        # Click any element containing "Login" text\n```\n\n```yaml\n- clickOn: "Add to Cart"  # Click button with "Add to Cart" text\n```\n\n```yaml\n- clickOn: "Next"         # Click element containing "Next" text\n```\n\n**Note:** If multiple elements contain the same text, only the first occurrence will be clicked. For precise targeting, use CSS selectors instead.',
};




export const clickOnSelectorMeta: Meta = {
    markdownDescription:
        'CSS selector to identify the clickable element.\n\n**Usage**  \nStandard CSS selector syntax to target specific elements for clicking.\n\n**Examples**\n- `#submit-btn` — Click element with ID \'submit-btn\'\n- `.nav-link` — Click element with class \'nav-link\'\n- `button[type="submit"]` — Click submit button\n- `a[href="/login"]` — Click link with specific href\n- `[data-testid="confirm-button"]` — Click element with test ID\n\n**Common Use Cases**\n```yaml\n- clickOn:\n    selector: "#login-button"  # Click login button by ID\n```\n\n```yaml\n- clickOn:\n    selector: ".modal-close"   # Click modal close button\n```\n\n```yaml\n- clickOn:\n    selector: \'button[type="submit"]\'  # Click form submit button\n```',
};




export const clickOnMeta: Meta = {
    title: "ClickOn Action",
    description:
        "Defines a click action that can target elements either by CSS selector or by visible text content.",
};