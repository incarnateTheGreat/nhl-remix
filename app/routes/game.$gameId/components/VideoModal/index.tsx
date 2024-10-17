import { Dispatch, SetStateAction, useEffect } from "react";

type VideoModalProps = {
  videoToLoad: string;
  setVisible: Dispatch<SetStateAction<boolean>>;
};

export default function VideoModal({
  videoToLoad,
  setVisible,
}: VideoModalProps) {
  const closeModalOnKeyDown = (e: KeyboardEvent) => {
    if (e.key === "Escape") {
      setVisible(false);
    }
  };

  const closeModalOnClickAway = () => {
    const id = document?.getElementById?.("modalParent")?.id;

    if (id === "modalParent") {
      setVisible(false);
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
    <div
      className="fixed left-0 top-0 z-10 flex h-full w-full items-center justify-center bg-black/70"
      id="modalParent"
    >
      <div className="absolute w-5/6 md:w-9/12">
        <video
          controls
          autoPlay
          className="h-full w-full rounded bg-transparent"
        >
          <track kind="captions" />
          <source src={videoToLoad} type="video/mp4" />
        </video>
        <button
          className="bg-game-background/40 absolute right-1 top-1 z-20 cursor-pointer px-3 text-lg font-semibold text-black opacity-90"
          onClick={() => setVisible(false)}
        >
          X
        </button>
      </div>
    </div>
  );
}
