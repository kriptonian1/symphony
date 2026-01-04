
# Symphony YAML Grammar

This document describes the grammar and available options for writing Symphony E2E workflow files in YAML.

---

## Workflow Structure

Each Symphony workflow YAML file must follow this structure:

```yaml
name: <string>            # Required. Name of your workflow.
url: <string>             # Required. Target website URL (must be valid URI).
colorMode: <light|dark>   # Optional. UI color mode. Defaults to "light".
flow:                     # Required. Ordered list of workflow steps.
  - <action>
  - <action>
```

---

## Actions (Flow Steps)

Each item in `flow` is an action. Supported actions:

### 1. Input

Enter a value into an input field.

```yaml
- input:
  selector: <selector>
  value: <string>
```

#### Selector Syntax

You can use several locator strategies for `selector`:

- `label:<label text>` — by visible label or aria-label
- `testID:<test id>` — by `data-testid` attribute
- `placeholder:<placeholder text>` — by placeholder
- `role:<role> name="<name>"` — by ARIA role and accessible name
- CSS selector — e.g., `#username`, `.form-input`, `input[name="email"]`

**Examples:**

```yaml
- input:
  selector: 'label:Email'
  value: 'user@example.com'
- input:
  selector: 'testID:login-input'
  value: 'alice'
- input:
  selector: 'role:textbox name="username"'
  value: 'bob'
- input:
  selector: '#search'
  value: 'Symphony'
```

---

### 2. ClickOn

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

---

### 3. WaitFor

Pause execution for a specified duration (milliseconds).

```yaml
- waitFor:
  duration: <number>
```

**Example:**

```yaml
- waitFor:
  duration: 2000
```

---

### 4. Keyboard

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

---

### 5. Scroll

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

## Option Reference

### Workflow Options

- `name` (string, required): Display name for the workflow.
- `url` (string, required): Target website URL. Must be a valid URI.
- `colorMode` (string, optional): "light" or "dark". Defaults to "light".
- `flow` (array, required): List of actions (see above).

### Selector Strategies (for input/clickOn)

- `label:<text>` — by label or aria-label
- `testID:<id>` — by data-testid
- `placeholder:<text>` — by placeholder
- `role:<role> name="<name>"` — by ARIA role and name
- CSS selector — e.g., `#id`, `.class`, `input[name="foo"]`

### Keyboard Keys

Supported keys include:

- Modifier keys: `Shift`, `Control`, `Alt`, `Meta`, `ControlOrMeta`
- Alphabetic: `KeyA` ... `KeyZ`
- Digits: `Digit0` ... `Digit9`
- Function: `F1` ... `F12`
- Arrow: `ArrowUp`, `ArrowDown`, `ArrowLeft`, `ArrowRight`
- Editing: `Backspace`, `Tab`, `Enter`, `Delete`, `Escape`, `Space`, `Insert`
- Page navigation: `Home`, `End`, `PageUp`, `PageDown`
- Symbol: `Minus`, `Equal`, `BracketLeft`, `BracketRight`, `Backslash`, `Semicolon`, `Quote`, `Backquote`, `Comma`, `Period`, `Slash`
- Lock: `CapsLock`, `ScrollLock`
- Misc: `ContextMenu`, `Pause`, `PrintScreen`

### ARIA Roles (for role selector)

Supported roles include (not exhaustive):

- `button`, `textbox`, `searchbox`, `link`, `checkbox`, `radio`, `tab`, `tabpanel`, `menuitem`, `listbox`, `option`, `dialog`, `form`, `grid`, `row`, `cell`, `table`, `navigation`, `main`, `banner`, `alert`, `tooltip`, etc.

---

## Example Workflow

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
