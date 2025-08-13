// const ProjectPage = () => {
//   return (
//     <div className="flex flex-wrap">
//       <div className="w-[50%] bg-blue-500 p-4 text-white">Div 1</div>
//       <div className="w-[50%] bg-green-500 p-4 text-white">Div 2</div>
//       <div className="w-[50%] bg-red-500 p-4 text-white">Div 3</div>
//     </div>
//   );
// };

// export default ProjectPage;

import { useEffect } from "react";
import { useMediaBackgroundStore } from "../../state/mediaBackgroundStore";

const ProjectPage = () => {
  const { mediaBackground, fetchMediaBackground } = useMediaBackgroundStore();

  useEffect(() => {
    fetchMediaBackground();
  }, [fetchMediaBackground]);

  return (
    <div className="flex flex-wrap gap-4 p-4">
      {mediaBackground[0] && (
        <div className="w-[calc(50%-8px)]">
          <div className="text-white text-sm mb-2">
            Type: {mediaBackground[0].type} | Mime:{" "}
            {mediaBackground[0].mimetype}
          </div>
          <div className="text-white text-xs mb-2">
            URL: {mediaBackground[0].url}
          </div>
          {mediaBackground[0].type === "image" ? (
            <img
              src={mediaBackground[0].url}
              alt="Media 1"
              className="w-full h-auto rounded-lg shadow-lg"
              onError={(e) => {
                console.error(
                  "Image load error for URL:",
                  mediaBackground[0].url
                );
                console.error("Full media object:", mediaBackground[0]);
                e.target.style.display = "none";
              }}
            />
          ) : mediaBackground[0].type === "video" ? (
            <video
              src={mediaBackground[0].url}
              muted
              autoPlay
              loop
              className="w-full h-auto rounded-lg shadow-lg"
              onError={(e) => {
                console.error(
                  "Video load error for URL:",
                  mediaBackground[0].url
                );
                console.error("Full media object:", mediaBackground[0]);
                e.target.style.display = "none";
              }}
            />
          ) : (
            <div className="text-white bg-gray-700 p-4 rounded-lg">
              Unsupported media type: {mediaBackground[0].mimetype}
            </div>
          )}
        </div>
      )}
    </div>
  );
};

export default ProjectPage;
