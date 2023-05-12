import "server-only";

import React from "react";
import { marked } from "marked";
import sanitizeHtml from "sanitize-html";

import styles from "./Post.module.css";

type Props = {
    safetext: string;
}

export default function PostText({ safetext }: Props) {
    try {
        safetext = marked(safetext, { mangle: true });
        safetext = sanitizeHtml(safetext);
    } catch (e) {
        safetext = ''
        console.error("Could not parse selftext", e);
    }

    return <div
        className={styles.text}
        dangerouslySetInnerHTML={{ __html: safetext }}
    ></div>
}