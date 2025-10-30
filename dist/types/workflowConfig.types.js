"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.WorkflowConfigSchema = exports.action = exports.WaitForActionSchema = exports.ClickActionSchema = exports.InputActionSchema = void 0;
const zod_1 = __importDefault(require("zod"));
exports.InputActionSchema = zod_1.default.object({
    type: zod_1.default.literal("input"),
    input: zod_1.default.object({
        selector: zod_1.default.string(),
        value: zod_1.default.string(),
    }),
});
exports.ClickActionSchema = zod_1.default.object({
    type: zod_1.default.literal("clickOn"),
    clickOn: zod_1.default.object({
        selector: zod_1.default.string(),
    }),
});
exports.WaitForActionSchema = zod_1.default.object({
    type: zod_1.default.literal("waitFor"),
    waitFor: zod_1.default.object({
        duration: zod_1.default.number(),
    }),
});
exports.action = zod_1.default.discriminatedUnion("type", [
    exports.InputActionSchema,
    exports.ClickActionSchema,
    exports.WaitForActionSchema,
]);
exports.WorkflowConfigSchema = zod_1.default.object({
    name: zod_1.default.string(),
    url: zod_1.default.url(),
    flow: zod_1.default.array(exports.action),
});
//# sourceMappingURL=workflowConfig.types.js.map