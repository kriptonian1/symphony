# Symphony Developer Guide

Welcome to **Symphony** — the human-friendly, YAML-based E2E testing framework for the web. Symphony lets you automate browser workflows in a way that feels natural, readable, and fast to write. This guide will help you get started, understand the YAML syntax, and master all available commands.

---

## 🚀 Getting Started

### 1. **Prerequisites**

- **[Bun](https://bun.sh/)** version **1.3.0+**
- Node.js (for npm install, if not using Bun)
- Playwright browsers (installed automatically by setup script)

### 2. **Installation**

#### **Using npm**

```sh
npm install -g @kriptonian/symphony
```

#### **Post-install Setup**

After installing, run the setup script to install Playwright browsers and patch dependencies:

```sh
curl -sL https://raw.githubusercontent.com/kriptonian1/symphony/refs/heads/develop/scripts/setup.sh | bash
```

#### **Verify Installation**

```sh
symphony --version
```

---

## 🏁 Quick Start Example

Create a file called `my-workflow.yml`:

```yaml
name: My First Test
url: https://example.com/
colorMode: dark

flow:
  - input:
      selector: 'label:Username'
      value: 'testuser'
  - input:
      selector: 'label:Password'
      value: 'secret'
  - clickOn: Login
  - waitFor:
      duration: 2000
  - scroll:
      direction: down
  - keyboard:
      key: Enter
```

Run your workflow:

```sh
symphony --file my-workflow.yml
```

---

## 🛠️ CLI Commands & Options

Symphony provides a simple CLI interface:

```sh
symphony --file <path-to-yaml> [options]
```

### **Options**

| Option                       | Alias | Description                                                      | Default    |
|------------------------------|-------|------------------------------------------------------------------|------------|
| `--file <path>`              | `-f`  | **(Required)** Path to the workflow YAML file                    |            |
| `--headless` / `--hl`        |       | Run browser in headless mode                                     | `false`    |
| `--browser-engine <engine>`  | `--be`| Browser engine: `chromium`, `webkit`, or `firefox`               | `chromium` |
| `--version`                  |       | Show Symphony version                                            |            |
| `--help`                     |       | Show CLI help                                                    |            |

**Example:**

```sh
symphony --file flow-example/google.yml --headless --browser-engine firefox
```

---

## 📝 YAML Workflow Syntax

A Symphony workflow YAML consists of:

- `name`: Name of the workflow (string)
- `url`: Target website URL (string, must be a valid URL)
- `colorMode`: (optional) `"light"` or `"dark"` (default: `"light"`)
- `flow`: List of steps (actions) to perform

### **Supported Actions**

#### 1. **Input**

Enter text into an input field.

```yaml
- input:
    selector: <selector>
    value: <text>
```

**Selector strategies:**

- `label:<label text>` — by visible label or aria-label
- `testID:<test id>` — by `data-testid` attribute
- `placeholder:<placeholder text>` — by placeholder
- `role:<role> name="<name>"` — by ARIA role and accessible name
- CSS selector — e.g., `#username`, `.form-input`, `input[name="email"]`

**Example:**

```yaml
- input:
    selector: 'label:Email'
    value: 'user@example.com'
```

#### 2. **ClickOn**

Click an element by visible text or CSS selector.

```yaml
- clickOn: <text>
```

or

```yaml
- clickOn:
    selector: <css selector>
```

**Examples:**

```yaml
- clickOn: "Login"
- clickOn:
    selector: "#submit-btn"
```

#### 3. **WaitFor**

Pause execution for a specified duration (milliseconds).

```yaml
- waitFor:
    duration: 2000
```

#### 4. **Keyboard**

Simulate key presses or shortcuts.

```yaml
- keyboard:
    key: <key or combination>
```

**Supported keys:**

- Single keys: `Enter`, `Escape`, `KeyA`, `ArrowUp`, etc.
- Combinations: `Control+KeyA`, `Shift+Alt+KeyS`, `ControlOrMeta+KeyC`

**Examples:**

```yaml
- keyboard:
    key: Enter
- keyboard:
    key: Control+KeyA
```

#### 5. **Scroll**

Scroll the page by direction or to a position.

**By direction:**

```yaml
- scroll:
    direction: down   # or "up"
    speed: 100        # (optional, pixels/sec, default: 300)
```

**By position:**

```yaml
- scroll:
    position:
      x: 0
      y: 500
```

---

## 🧩 Full Example

```yaml
name: Demo Workflow
url: https://myapp.com/
colorMode: light

flow:
  - input:
      selector: 'label:Username'
      value: 'alice'
  - input:
      selector: 'label:Password'
      value: 'wonderland'
  - clickOn: "Sign In"
  - waitFor:
      duration: 1500
  - scroll:
      direction: down
      speed: 200
  - keyboard:
      key: Control+KeyK
```

---

## 🧠 Tips & Best Practices

- Use semantic selectors (`label:`, `testID:`, `placeholder:`, `role:`) for robust tests.
- Use `waitFor` after actions that trigger navigation or animations.
- Use `colorMode` to ensure consistent UI appearance.
- Use `--headless` for CI/CD environments.

---

## 📚 Reference

- [Workflow JSON Schema](../schemas/json/symphony.json)
- [Example Workflows](../flow-example/)
- [Grammar Reference](./grammer.md)

---

## ❓ FAQ

**Q: Can I use Playwright selectors?**  
A: Yes! All CSS selectors supported by Playwright are valid.

**Q: How do I debug my workflow?**  
A: Omit `--headless` to see the browser UI.

**Q: How do I add new actions?**  
A: See the [contributing guide](https://github.com/kriptonian1/symphony) (coming soon).

---

## 🧑‍💻 YAML Autocompletion & LSP Support

For a better developer experience—such as autocompletion, in-line documentation, and validation while writing your Symphony YAML files—add the following line at the very top of your YAML test file:

```yaml
# yaml-language-server: $schema=https://raw.githubusercontent.com/kriptonian1/symphony/refs/heads/main/schemas/json/symphony.json
```

This enables your editor to provide smart suggestions and documentation for all Symphony actions and fields.

**Recommended:**

- Install the [YAML extension by Red Hat](https://marketplace.visualstudio.com/items?itemName=redhat.vscode-yaml) in VS Code for full LSP support and schema-based autocompletion.

---

Happy testing with Symphony!  
For more, visit [Symphony on GitHub](https://github.com/kriptonian1/symphony)
