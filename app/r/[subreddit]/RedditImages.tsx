import Image from "next/image";

type Props = {
  post: any;
};

export default function RedditImages({ post }: Props): JSX.Element {
  if (post.video) {
    return (
      <video
        src={post.video.src}
        controls
        loop
        style={{
          width: "100%",
          height: "auto",
          maxHeight: "100vh",
        }}
      ></video>
    );
  }

  if (post.images?.length) {
    return post.images.map((image: any) => (
      <Image
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
    ));
  }

  return <></>;
}
