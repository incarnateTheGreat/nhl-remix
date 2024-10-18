import { useEffect, useState } from "react";
import VideoModal from "../VideoModal";
import axios from "axios";

type VideoThumbnailProps = {
  videoId: number;
};

export type VideoData = {
  poster: string;
  videoUrl: string;
};

const brightcoveApi = axios.create({
  baseURL: "https://edge.api.brightcove.com",
  headers: {
    Accept:
      "application/json;pk=BCpkADawqM3l37Vq8trLJ95vVwxubXYZXYglAopEZXQTHTWX3YdalyF9xmkuknxjBgiMYwt8VZ_OZ1jAjYxz_yzuNh_cjC3uOaMspVTD-hZfNUHtNnBnhVD0Gmsih8TBF8QlQFXiCQM3W_u4ydJ1qK2Rx8ZutCUg3PHb7Q",
  },
});

export default function VideoThumbnail({ videoId }: VideoThumbnailProps) {
  const [visible, setVisible] = useState(false);
  const [videoData, setVideoData] = useState<VideoData>({
    poster: "",
    videoUrl: "",
  });

  async function getData() {
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
        className="ml-2 flex h-8 w-8 cursor-pointer items-center justify-center rounded-full bg-blue-700 text-lg text-white transition-colors hover:bg-blue-900"
        onClick={() => {
          getData();
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
