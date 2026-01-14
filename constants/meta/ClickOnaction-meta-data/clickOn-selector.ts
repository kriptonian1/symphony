


import { Meta } from "../json-schema-meta.ts";
export const clickOnSelectorMeta: Meta = {
    markdownDescription:
        'CSS selector to identify the clickable element.\n\n**Usage**  \nStandard CSS selector syntax to target specific elements for clicking.\n\n**Examples**\n- `#submit-btn` — Click element with ID \'submit-btn\'\n- `.nav-link` — Click element with class \'nav-link\'\n- `button[type="submit"]` — Click submit button\n- `a[href="/login"]` — Click link with specific href\n- `[data-testid="confirm-button"]` — Click element with test ID\n\n**Common Use Cases**\n```yaml\n- clickOn:\n    selector: "#login-button"  # Click login button by ID\n```\n\n```yaml\n- clickOn:\n    selector: ".modal-close"   # Click modal close button\n```\n\n```yaml\n- clickOn:\n    selector: \'button[type="submit"]\'  # Click form submit button\n```',
};