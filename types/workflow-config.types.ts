import { jsonSchemaMeta, rootMeta } from "@constants/json-schema-meta";
import z from "zod";
import { KeyboardSchema } from "./keyboard.type";

export const InputActionSchema = z
	.object({
		input: z
			.object({
				selector: z.string().meta(jsonSchemaMeta.flow.input.selector),
				value: z.string().meta(jsonSchemaMeta.flow.input.value),
			})
			.meta(jsonSchemaMeta.flow.input.description),
	})
	.meta(jsonSchemaMeta.flow.input.description);

export const ClickActionSchema = z
	.object({
		clickOn: z
			.union([
				z.object({
					selector: z.string().meta(jsonSchemaMeta.flow.clickOn.selector),
				}),
				z.string().meta(jsonSchemaMeta.flow.clickOn.string),
			])
			.meta(jsonSchemaMeta.flow.clickOn.description),
	})
	.meta(jsonSchemaMeta.flow.clickOn.description);

export const WaitForActionSchema = z
	.object({
		waitFor: z
			.object({
				duration: z.number().meta(jsonSchemaMeta.flow.waitFor.duration),
			})
			.meta(jsonSchemaMeta.flow.waitFor.description),
	})
	.meta(jsonSchemaMeta.flow.waitFor.description);

export const KeyboardActionSchema = z
	.object({
		keyboard: z
			.object({
				key: z
					.string()
					.regex(
						/^([A-Za-z]+(\+)?)+$/,
						"Invalid shortcut format, the correct format is 'Control+KeyA' or 'Shift+Alt+KeyB'",
					)
					.superRefine((val, ctx) => {
						const parts = val.split("+").map((part) => part.trim());
						const result = parts.every(
							(part) => KeyboardSchema.safeParse(part).success,
						);
						if (!result) {
							ctx.addIssue({
								code: "custom",
								message: `One or more keys in the shortcut '${val}' are invalid.`,
							});
						}
					})
					.meta(jsonSchemaMeta.flow.keyboard.key),
			})
			.meta(jsonSchemaMeta.flow.keyboard.description),
	})
	.meta(jsonSchemaMeta.flow.keyboard.description);

export const ScrollActionSchema = z
	.object({
		scroll: z
			.union([
				z.object({
					direction: z
						.enum(["up", "down"])
						.meta(jsonSchemaMeta.flow.scroll.direction),
					speed: z.number().optional().meta(jsonSchemaMeta.flow.scroll.speed),
				}),
				z.object({
					position: z
						.object({
							x: z.number().meta(jsonSchemaMeta.flow.scroll.position.x),
							y: z.number().meta(jsonSchemaMeta.flow.scroll.position.y),
						})
						.meta(jsonSchemaMeta.flow.scroll.position.description),
				}),
			])
			.meta(jsonSchemaMeta.flow.scroll.description),
	})
	.meta(jsonSchemaMeta.flow.scroll.description);

export const IsVisibleActionSchema = z.object({
	isVisible: z
		.union([
			z.string().meta(jsonSchemaMeta.flow.isVisible.string),
			z.object({
				selector: z.string().meta(jsonSchemaMeta.flow.isVisible.selector),
			}),
		])
		.meta(jsonSchemaMeta.flow.isVisible.description),
});

export const FlowStepSchema = z.union([
	InputActionSchema,
	ClickActionSchema,
	WaitForActionSchema,
	KeyboardActionSchema,
	ScrollActionSchema,
	IsVisibleActionSchema,
]);

export const WorkflowConfigSchema = z
	.object({
		name: z.string("Workflow name must be a string").meta(jsonSchemaMeta.name),
		url: z
			.httpUrl({
				error:
					"Invalid URL format, please provide a valid URL. example: https://www.example.com or http://localhost:3000",
			})
			.meta(jsonSchemaMeta.url),
		colorMode: z
			.enum(["light", "dark"])
			.default("light")
			.optional()
			.meta(jsonSchemaMeta.colorMode),
		flow: z.array(FlowStepSchema).meta(jsonSchemaMeta.flow.description),
	})
	.meta(rootMeta);

export type WorkflowConfig = z.infer<typeof WorkflowConfigSchema>;
export type FlowStep = z.infer<typeof FlowStepSchema>;
export type InputAction = z.infer<typeof InputActionSchema>;
export type ClickAction = z.infer<typeof ClickActionSchema>;
export type WaitForAction = z.infer<typeof WaitForActionSchema>;
export type KeyboardAction = z.infer<typeof KeyboardActionSchema>;
export type ScrollAction = z.infer<typeof ScrollActionSchema>;
export type IsVisibleAction = z.infer<typeof IsVisibleActionSchema>;
