import { spinner } from "@clack/prompts";
import type { BaseFlowParam } from "@type/base-flow.types";
import type { ScrollAction } from "@type/workflow-config.types";
import chalk from "chalk";

async function handleScrollSpeed(
	amount: number,
	onScrollIteration: (deltaY: number) => Promise<void>,
	speed: number = 300,
) {
	const sleep = (ms: number) => new Promise((res) => setTimeout(res, ms));
	if (speed && speed > 0) {
		const total = amount;
		// duration in ms to complete the scroll at given speed
		const durationMs = Math.max(8, (Math.abs(total) / speed) * 1000);
		const frameMs = 16; // ~60fps
		const steps = Math.max(1, Math.ceil(durationMs / frameMs));
		const perStep = total / steps;

		for (let i = 0; i < steps; i++) {
			await onScrollIteration(perStep);
			// small pause to control perceived speed
			await sleep(frameMs);
		}
	} else {
		// default immediate single-wheel event
		await onScrollIteration(amount);
	}
}

function getScrollDistance(direction: "up" | "down"): number {
	let amount = 0;
	if (direction === "down") {
		amount = 200;
	} else if (direction === "up") {
		amount = -100;
	}
	return amount;
}

export default async function scrollFlow({
	step: scrollStep,
	page,
}: BaseFlowParam<ScrollAction>): Promise<void> {
	if ("direction" in scrollStep.scroll) {
		const scrollSpinner = spinner();
		scrollSpinner.start(`Scrolling ${scrollStep.scroll.direction}`);
		const direction = scrollStep.scroll.direction;
		const amount = getScrollDistance(direction);

		const speed = scrollStep.scroll.speed; // pixels per second

		await handleScrollSpeed(
			amount,
			async (deltaY) => {
				await page.mouse.wheel(0, deltaY);
			},
			speed,
		);
		scrollSpinner.stop(`${chalk.green("✓")} Scrolled ${direction}`);
	}
	if ("position" in scrollStep.scroll) {
		const { x, y } = scrollStep.scroll.position;
		console.log(`Scrolling to position: (${x}, ${y})`);
		await page.mouse.move(x, y);
	}
}
