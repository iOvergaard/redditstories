import "server-only";

import React from "react";
import Image from "next/image";
import { getPlaiceholder } from "plaiceholder";

type Props = {
  post: any;
  isFirst: boolean;
};

async function getPlaiceholderImage(src: string, hasPriority = false) {
  src = src.replace(/&amp;/g, "&");
  const { base64, img } = await getPlaiceholder(src);
  return {
    ...img,
    blurDataURL: base64,
    priority: hasPriority,
  };
}

export default function RedditImages({ post, isFirst }: Props): JSX.Element {
  if (post.video) {
    return (
      <video
        src={post.video.src}
        controls
        loop
        muted
        autoPlay
        playsInline
        preload="auto"
        style={{
          width: "100%",
          height: "auto",
          maxHeight: "100vh",
        }}
      ></video>
    );
  }

  if (post.images?.length) {
    return post.images.map(async (imageUrl: any) => {
      const image = await getPlaiceholderImage(imageUrl, isFirst);
      return <Image
        key={image.src}
        alt=""
        sizes="(max-width: 756px) 100vw, 756px"
        width={756}
        height={Math.round(image.height * (756 / image.width))}
        style={{
          width: "100%",
          height: "auto",
        }}
        src={image.src}
        placeholder="blur"
        blurDataURL={image.blurDataURL}
        priority={image.priority}
      />
    });
  }

  return <></>;
}
