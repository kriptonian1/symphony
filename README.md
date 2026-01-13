# Symphony

> E2E testing made effortless for web

Symphony is tool to help you write E2E test like human, it use a YAML to define tests 

<p align="center">
  <a href="https://github.com/user-attachments/assets/4ccc9a61-8135-430c-b7a3-929033fe6fc7">
  <img
    src="https://github.com/user-attachments/assets/d6764c1a-8427-4704-b354-d15cbf53fc2a"
    width="100%"
    alt="Demo preview"
  />
  </a>
</p>

<p align="center">
  ▶ <a href="https://github.com/user-attachments/assets/4ccc9a61-8135-430c-b7a3-929033fe6fc7">
    Watch the full 28-second demo
  </a>
</p>

---





### 🧩 Prerequisites

Symphony requires **[Bun](https://bun.com/)** version **1.3.0 or higher**.  
If you don’t have Bun installed yet, follow the [official installation guide](https://bun.com/docs/installation) — it only takes a minute.

> 💡 **Tip:** Run `bun --version` to check your current version.

---

### ⚙️ Installation

You can install Symphony in using bun or npm.

<!--
#### 🧵 Option 1: macOS (via Homebrew)

If you’re on macOS and use [Homebrew](https://brew.sh/):

```bash
brew tap kriptonian1/symphony https://github.com/kriptonian1/symphony
brew install symphony
```
Once installed, verify everything works:
```
symphony --version
```

You’re ready to roll! 🎉

---
-->

#### 📦 NPM install

If you prefer installing through npm or are on Windows/Linux/MacOS, run the following command:

```
npm install -g @kriptonian/symphony
```
then run the following command to setup symphony
1. If you're on Linux or MacOS, run:
```sh
curl -sL https://raw.githubusercontent.com/kriptonian1/symphony/refs/heads/develop/scripts/setup.sh | bash
```
2. If you're on Windows, run:
```ps1
iwr -useb https://raw.githubusercontent.com/kriptonian1/symphony/refs/heads/develop/scripts/setup.ps1 | iex
```
> [!tip]
> **For Windows Users:** If you encounter a permission error, run the following command first:
> ```ps1
> Set-ExecutionPolicy -ExecutionPolicy RemoteSigned -Scope CurrentUser
> ```
> Then go to step 2 above to run the setup script.
>

Then check your installation:

```
symphony --version
```

## 📚 Documentation
- 🚀 **[Getting Started](./docs/developer-docs.md)**  
  Learn how to install Symphony, write your first YAML test, and run it locally.
- 🧠 **[YAML DSL Reference](./docs/grammer.md)**  
  A complete reference of Symphony’s human-readable testing language — steps, syntax, and execution rules.

