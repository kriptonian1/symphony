import z from "zod";

const modifierKeys = [
	"Shift",
	"Control",
	"Alt",
	"Meta",
	"ControlOrMeta",
] as const;

// These are the alphabetic keys and not the characters associated with them, meaning 'KeyA' represents the 'a' key regardless of whether Shift is held down or not.
const alphabeticKeys = [
	"KeyA",
	"KeyB",
	"KeyC",
	"KeyD",
	"KeyE",
	"KeyF",
	"KeyG",
	"KeyH",
	"KeyI",
	"KeyJ",
	"KeyK",
	"KeyL",
	"KeyM",
	"KeyN",
	"KeyO",
	"KeyP",
	"KeyQ",
	"KeyR",
	"KeyS",
	"KeyT",
	"KeyU",
	"KeyV",
	"KeyW",
	"KeyX",
	"KeyY",
	"KeyZ",
] as const;

// These are the digit keys located at the top of the keyboard, not on the numpad. Also it does not include special characters that may be produced by these keys when combined with Shift or other modifiers.
const digitKeys = [
	"Digit1",
	"Digit2",
	"Digit3",
	"Digit4",
	"Digit5",
	"Digit6",
	"Digit7",
	"Digit8",
	"Digit9",
	"Digit0",
] as const;

const functionKeys = [
	"F1",
	"F2",
	"F3",
	"F4",
	"F5",
	"F6",
	"F7",
	"F8",
	"F9",
	"F10",
	"F11",
	"F12",
] as const;

const keypadKeys = [
	"NumLock",
	"Numpad0",
	"Numpad1",
	"Numpad2",
	"Numpad3",
	"Numpad4",
	"Numpad5",
	"Numpad6",
	"Numpad7",
	"Numpad8",
	"Numpad9",
	"NumpadAdd",
	"NumpadSubtract",
	"NumpadMultiply",
	"NumpadDivide",
	"NumpadDecimal",
	"NumpadEnter",
] as const;

const arrowKeys = ["ArrowUp", "ArrowDown", "ArrowLeft", "ArrowRight"] as const;

const editingKeys = [
	"Backspace",
	"Tab",
	"Enter",
	"Delete",
	"Escape",
	"Space",
	"Insert",
] as const;

const pageNavigationKeys = ["Home", "End", "PageUp", "PageDown"] as const;

const symbolKeys = [
	"Minus",
	"Equal",
	"BracketLeft",
	"BracketRight",
	"Backslash",
	"Semicolon",
	"Quote",
	"Backquote",
	"Comma",
	"Period",
	"Slash",
] as const;

const lockKeys = ["CapsLock", "ScrollLock"] as const;

const miscKeys = ["ContextMenu", "Pause", "PrintScreen"] as const;

const allKeys = [
	...modifierKeys,
	...alphabeticKeys,
	...digitKeys,
	...functionKeys,
	...keypadKeys,
	...arrowKeys,
	...editingKeys,
	...pageNavigationKeys,
	...symbolKeys,
	...lockKeys,
	...miscKeys,
] as const;

export const KeyboardSchema = z.enum(allKeys);
export type Keyboard = z.infer<typeof KeyboardSchema>;
