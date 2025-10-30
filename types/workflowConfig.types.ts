import z from "zod";

export const InputActionSchema = z.object({
    input: z.object({
        selector: z.string(),
        value: z.string(),
    }),
});

export const ClickActionSchema = z.object({
    clickOn: z.union([
        z.object({
            selector: z.string(),
        }),
        z.string(),
    ]),
});

export const WaitForActionSchema = z.object({
    waitFor: z.object({
        duration: z.number(),
    }),
});

export const KeyboardActionSchema = z.object({
    keyboard: z.object({
        key: z.string(),
    }),
});

export const ScrollActionSchema = z.object({
    scroll: z.union([
        z.object({
            direction: z.enum(["up", "down"]),
            speed: z.number().optional(),
        }),
        z.object({ position: z.object({ x: z.number(), y: z.number() }) }),
    ]),
});

export const FlowStepSchema = z.union([
    InputActionSchema,
    ClickActionSchema,
    WaitForActionSchema,
    KeyboardActionSchema,
    ScrollActionSchema,
]);

export const WorkflowConfigSchema = z.object({
    name: z.string(),
    url: z.url(),
    colorMode: z.enum(["light", "dark"]).optional(),
    flow: z.array(FlowStepSchema),
});

export type WorkflowConfig = z.infer<typeof WorkflowConfigSchema>;
export type FlowStep = z.infer<typeof FlowStepSchema>;
export type InputAction = z.infer<typeof InputActionSchema>;
export type ClickAction = z.infer<typeof ClickActionSchema>;
export type WaitForAction = z.infer<typeof WaitForActionSchema>;
export type KeyboardAction = z.infer<typeof KeyboardActionSchema>;
export type ScrollAction = z.infer<typeof ScrollActionSchema>;
