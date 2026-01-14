import { Meta } from "../json-schema-meta.ts";

export const scrollSpeedMeta: Meta = {
    description:
        "Speed of the scroll action in pixels per second. Higher values result in faster scrolling. If not specified, defaults to 300 pixels per second.",
    default: 300,
};