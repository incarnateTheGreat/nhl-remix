import { Dispatch, SetStateAction, useEffect } from "react";

import { VideoData } from "../VideoThumbnail";

type VideoModalProps = {
  videoData: VideoData;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export default function VideoModal({ videoData, setVisible }: VideoModalProps) {
  const closeModalOnKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setVisible(false);
    }
  };

  const closeModalOnClickAway = (e: MouseEvent) => {
    const target = document.getElementById("video");

    if (target) {
      const withinBoundaries = e.composedPath().includes(target);

      if (!withinBoundaries) {
        setVisible(false);
      }
    }
  };

  useEffect(() => {
    document.addEventListener("keydown", closeModalOnKeyDown);
    document.addEventListener("click", closeModalOnClickAway);

    return () => {
      document.removeEventListener("keydown", closeModalOnKeyDown);
      document.removeEventListener("click", closeModalOnClickAway);
    };
  }, []);

  return (
    <dialog className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black/70">
      <div className="absolute w-5/6 md:w-9/12" id="video">
        <video
          controls
          autoPlay
          className="h-full w-full rounded bg-transparent"
          poster={videoData.poster}
        >
          <track kind="captions" />
          <source src={videoData.videoUrl} type="video/mp4" />
        </video>
        <button
          className="absolute right-2 top-2 z-20 cursor-pointer bg-slate-200/40 text-lg font-bold text-black opacity-90 transition-opacity duration-75 hover:bg-slate-200"
          onClick={() => setVisible(false)}
        >
          X
        </button>
      </div>
    </dialog>
  );
}
