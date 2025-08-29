import { useEffect, useRef } from "react";
import { useMediaBackgroundStore } from "../../state/mediaBackgroundStore";
// import MediaPlayer from "../shared/components/MediaPlayer";

const MediaPlayerDB = () => {
  const { mediaBackground, fetchMediaBackground } = useMediaBackgroundStore();
  const mediaRef = useRef(null);

  useEffect(() => {
      fetchMediaBackground();
  }, [fetchMediaBackground]);

  useEffect(() => {
    if (mediaRef.current) {
      mediaRef.current.style.position = "fixed";
      mediaRef.current.style.top = "0";
      mediaRef.current.style.left = "0";
      mediaRef.current.style.zIndex = "1000";
    }

    return () => {};
  }, []);

  // if (loading || mediaBackground.length === 0) {
  //   return (
  //     <MediaPlayer
  //       src="assets/images/background.png"
  //       className="w-full h-full object-cover pointer-events-none"
  //     />
  //   );
  // }

  return (
    <>
      {mediaBackground[0] && (
        <div className="w-full h-full inset-0 z-0 pointer-events-none">
          {mediaBackground[0].type === "image" && (
            <img
              src={mediaBackground[0].url}
              className="w-full h-full object-cover"
              onError={(e) => {
                console.error("Image load error:", mediaBackground[0].url);
                e.target.style.display = "none";
              }}
            />
          )}
          {mediaBackground[0].type === "video" && (
            <video
              src={mediaBackground[0].url}
              muted
              autoPlay
              loop
              className="w-full h-full object-cover pointer-events-none"
              onError={(e) => {
                console.error("Video load error:", mediaBackground[0].url);
                e.target.style.display = "none";
              }}
            />
          )}
        </div>
      )}
    </>
  );
};

export default MediaPlayerDB;
