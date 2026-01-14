
import { Meta } from "../../json-schema-meta.ts";

export const scrollDirectionMeta: Meta = {
    description: "Direction to scroll the webpage.",
    enumDescriptions: ["Scrolls the page upwards", "Scrolls the page downwards"],
};



export const scrollMeta: Meta = {
    title: "Scroll Action",
    description: "Defines a horizontal or vertical scroll action on the webpage.",
};



export const scrollPositionMeta: Meta = {
    description:
        "Coordinates to scroll to on the webpage. Specify `x` and `y` values representing the horizontal and vertical positions respectively.",
};




export const scrollPositionXMeta: Meta = {
    description: "Horizontal position to scroll to on the webpage.",
};


export const scrollPositionYMeta: Meta = {
    description: "Vertical position to scroll to on the webpage.",
};



export const scrollSpeedMeta: Meta = {
    description:
        "Speed of the scroll action in pixels per second. Higher values result in faster scrolling. If not specified, defaults to 300 pixels per second.",
    default: 300,
};