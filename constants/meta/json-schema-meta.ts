import type z from "zod";

// biome-ignore lint/suspicious/noExplicitAny: we need any type here
export type Meta = Parameters<z.ZodType<any, any, any>["meta"]>[0];

// Root level metadata
export const rootMeta: Meta = {
	title: "Workflow Configuration",
	description:
		"Schema defining the structure of a workflow configuration including name, target URL, color mode, and flow steps.",
};







/**
 * Descriptions for JSON schema properties used in Zod schemas.
 */




import {
	// core
	nameMeta,
	urlMeta,
	colorModeMeta,
	flowMeta,

	// input
	inputMeta,
	inputSelectorMeta,
	inputValueMeta,

	// click
	clickOnMeta,
	clickOnStringMeta,
	clickOnSelectorMeta,

	// wait
	waitForMeta,
	waitForDurationMeta,

	// scroll
	scrollMeta,
	scrollDirectionMeta,
	scrollSpeedMeta,
	scrollPositionMeta,
	scrollPositionXMeta,
	scrollPositionYMeta,

	// keyboard
	keyboardMeta,
	keyboardKeyMeta,
} from "../meta/index.ts";
export const jsonSchemaMeta = {
	name: nameMeta,
	url: urlMeta,
	colorMode: colorModeMeta,
	flow: {
		description: flowMeta,
		input: {
			description: inputMeta,
			selector: inputSelectorMeta,
			value: inputValueMeta,
		},
		clickOn: {
			description: clickOnMeta,
			string: clickOnStringMeta,
			selector: clickOnSelectorMeta,
		},
		waitFor: {
			description: waitForMeta,
			duration: waitForDurationMeta,
		},
		scroll: {
			description: scrollMeta,
			direction: scrollDirectionMeta,
			speed: scrollSpeedMeta,
			position: {
				description: scrollPositionMeta,
				x: scrollPositionXMeta,
				y: scrollPositionYMeta,
			},
		},
		keyboard: {
			description: keyboardMeta,
			key: keyboardKeyMeta,
		},
	},
};
