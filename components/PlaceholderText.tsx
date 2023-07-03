import React from "react";

type Props = {
    textLength: number
}

/**
 * Function to generate blurred placeholder text of the given length in a paragraph
 */
export function PlaceholderText({ textLength }: Props) {
    return <div style={{
        wordBreak: "break-all",
        filter: "blur(5px)",
        width: "100%",
        backgroundColor: "#ccc",
        borderRadius: "0.5em",
        margin: "0.5em 0",
        padding: "0.5em",
        animation: "pulse 1.5s infinite",
        backgroundSize: "400% 100%",
        backgroundPosition: "100% 50%",
        backgroundRepeat: "no-repeat",
        backgroundImage: "linear-gradient(to right, #ccc 10%, #ddd 18%, #ccc 33%)",
    }}>
        {"e".repeat(textLength)}
    </div>
}