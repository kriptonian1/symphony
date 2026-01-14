
import { Meta } from "../json-schema-meta.ts";


export const inputSelectorMeta: Meta = {
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