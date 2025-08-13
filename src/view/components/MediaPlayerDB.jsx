import React, { useEffect } from "react";
import { useMediaBackgroundStore } from "../../state/mediaBackgroundStore";
import MediaPlayer from "../shared/components/MediaPlayer";

const MediaPlayerDB = () => {
    const { mediaBackground, fetchMediaBackground, loading} = useMediaBackgroundStore();
    useEffect(() => {
      fetchMediaBackground();
    }, [fetchMediaBackground]);

    if (loading || mediaBackground.length === 0) {
        return  <MediaPlayer 
        src="assets/images/background.png"
        className="w-full h-full object-cover"
      />
    }
  
  return (
    <>
      {mediaBackground[0] && (
        <div className="absolute w-full h-full">
          {mediaBackground[0].type === "image" && (
            <img
              src={mediaBackground[0].url}
              alt="Media 1"
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
              className="w-full h-full object-cover"
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
