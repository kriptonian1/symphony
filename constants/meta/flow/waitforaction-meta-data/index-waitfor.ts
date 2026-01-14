
import { Meta } from "../../json-schema-meta.ts";

export const waitForDurationMeta: Meta = {
    markdownDescription:
        "Duration in milliseconds to pause execution.\n\n**Usage**  \nPauses the workflow execution for the specified time period. Useful for:\n- Waiting for animations to complete\n- Allowing page content to load\n- Adding delays between rapid actions\n- Ensuring UI stability before next step\n\n**Examples**\n- `1000` — Wait for 1 second\n- `500` — Wait for 0.5 seconds\n- `3000` — Wait for 3 seconds\n- `100` — Wait for 0.1 seconds\n\n**Common Use Cases**\n```yaml\n- waitFor:\n    duration: 2000  # Wait 2 seconds for page to load\n```\n\n```yaml\n- waitFor:\n    duration: 500   # Brief pause after form submission\n```",
};




export const waitForMeta: Meta = {
    title: "WaitFor Action",
    description:
        "Defines a wait action that pauses workflow execution for a specified duration in milliseconds.",
};