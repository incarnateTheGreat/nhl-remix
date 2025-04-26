import { useLoaderData } from "@remix-run/react";
import { Game, Summary } from "types/types";

export default function Highlights() {
  const data = useLoaderData<Game & Summary>();

  if (!data?.gameVideo || !data?.gameVideo?.condensedGameVideoObject) {
    return <div>Video coming soon.</div>;
  }

  const {
    threeMinRecapVideoObject: { poster, videoUrl },
  } = data.gameVideo;

  return (
    <video
      controls
      className="h-full w-full rounded bg-transparent"
      poster={poster}
    >
      <track kind="captions" />
      <source src={videoUrl} type="video/mp4" />
    </video>
  );
}
