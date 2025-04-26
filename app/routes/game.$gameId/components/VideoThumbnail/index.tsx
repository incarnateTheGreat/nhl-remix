import { useEffect, useState } from "react";

import { brightcoveApi } from "~/utils";

import VideoModal from "../VideoModal";

type VideoThumbnailProps = {
  videoId: number;
};

export type VideoData = {
  poster: string;
  videoUrl: string;
};

export default function VideoThumbnail({ videoId }: VideoThumbnailProps) {
  const [visible, setVisible] = useState(false);
  const [videoData, setVideoData] = useState<VideoData>({
    poster: "",
    videoUrl: "",
  });

  async function getVideoData() {
    const { data } = await brightcoveApi.get(
      `/playback/v1/accounts/6415718365001/videos/${videoId}`,
    );

    if (data && data.sources.length > 0) {
      setVideoData({
        poster: data.poster,
        videoUrl: data.sources[data.sources.length - 1].src,
      });
      setVisible(true);
    }
  }

  useEffect(() => {
    return () => {
      setVisible(false);
    };
  }, []);

  return (
    <>
      <button
        className="mx-3 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-700 text-lg text-white transition-colors hover:bg-blue-900"
        onClick={() => {
          getVideoData();
        }}
      >
        &#9654;
      </button>

      {visible ? (
        <VideoModal videoData={videoData} setVisible={setVisible} />
      ) : null}
    </>
  );
}
