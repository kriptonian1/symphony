
import { Meta } from "../../json-schema-meta.ts";

export const keyboardMeta: Meta = {
    title: "Keyboard Action",
    description:
        "Defines a keyboard action that simulates key presses on the webpage.",
};




export const keyboardKeyMeta: Meta = {
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
