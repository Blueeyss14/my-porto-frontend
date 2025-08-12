import { useEffect, useRef } from "react";
import useSongPlaylistStore from "../../state/songPlaylistStore";
import BlurBackgorund from "../shared/components/BlurBackgorund";

export default function SongPlaylist() {
  const ref = useRef(null);
  const {
    isPlaying,
    currentTime,
    duration,
    // volume,
    // isMuted,
    // isLoading,
    formatTime,
    togglePlayPause,
    handleSeek,
    // handleVolumeChange,
    // toggleMute,
    getProgressPercent,
    setAudioRef,
    setupAudioListeners,
    currentSongIndex,
    songs,
    playNextSong,
    playPreviousSong,
    playSongByIndex,
  } = useSongPlaylistStore();

  const progressPercent = getProgressPercent();

  useEffect(() => {
    setAudioRef(ref.current);
    const cleanup = setupAudioListeners();
    return cleanup;
  }, [setAudioRef, setupAudioListeners]);

  const handleSelectSong = (index) => {
    playSongByIndex(index);
  };

  const handlePrevious = () => {
    playPreviousSong();
  };

  const handleNext = () => {
    playNextSong();
  };

  return (
    <div className="flex w-[90%] h-full items-start">
      {/* MUSIC PLAYER */}
      <div className="h-[68vh] min-w-100 mr-10 overflow-hidden ">
        <BlurBackgorund
          className="h-full w-full flex flex-col justify-end items-center px-5 py-7"
          roundedClass="rounded-[30px]"
          background="bg-white/2 border-white/2"
        >
          <div className="flex-1 w-full rounded-[20px] border-2 border-white/10"></div>
          {/* Song Title */}
          <h2 className="text-[1rem] text-homeBg2/70 my-4 line-clamp-1">
            {songs[currentSongIndex]?.song
              .split("/")
              .pop()
              .replace(/\.[^/.]+$/, "")
              .replace(/[-_]/g, " ")}
          </h2>
          <div
            className="w-full h-1 bg-homeBg2/50 overflow-hidden cursor-pointer my-1 rounded-full"
            onDrag={handleSeek}
            onClick={handleSeek}
          >
            <div
              className="h-full bg-homeBg2"
              style={{ width: `${progressPercent}%` }}
            ></div>
          </div>
          {/* Duration */}
          <div className="w-full flex items-center justify-between pt-1 text-[0.8rem] text-homeBg2">
            <h1>{formatTime(currentTime)}</h1>
            <h1>{formatTime(duration)}</h1>
          </div>
          <MusicPlayer />
        </BlurBackgorund>
      </div>
      {/* PLAYLIST */}
      <div className="h-full w-full flex-col">
        <h1 className="font-bold text-[3rem] text-homeBg2 mb-3">Playlist</h1>
        <div className="flex w-full h-full overflow-y-auto scrollbar-hide py-5">
          <div className="w-full h-full flex flex-col">
            {songs.map((s, i) => (
              <div
              key={s.song}
                className="w-full cursor-pointer"
                onClick={() => handleSelectSong(i)}
              >
                <div
                  className={`flex items-center ${
                    currentSongIndex === i
                      ? "text-homeBg/80"
                      : "font-normal text-homeBg/50"
                  }`}
                >
                  <h1 className="mr-4 text-[1.3rem]">#</h1>
                  <BlurBackgorund
                    background={`${
                      currentSongIndex === i
                        ? "bg-white/5 border-white/3 shadow-white/5 shadow-[0_0_30px_white]"
                        : "bg-white/1 border-white/1"
                    }`}
                    blur="backdrop-blur[50px]"
                    roundedClass="rounded-[5px] border-[1px]"
                    className="w-full flex justify-center items-center px-2 py-1 mb-1"
                  >
                    <div className="w-full">
                      <h1 className="overflow-ellipsis line-clamp-1 text-[0.9rem] ">
                        {s.song
                          .split("/")
                          .pop()
                          .replace(/\.[^/.]+$/, "")
                          .replace(/[-_]/g, " ")}
                      </h1>
                      <div className="w-full flex justify-start">
                        <h1 className="text-[10px] mb-1">{`${
                          currentSongIndex === i ? "Playing" : "Queue"
                        }`}</h1>
                      </div>
                      {/* divider */}
                      <div
                        className={`mt-1 mb-0 h-[1px] w-full ${
                          currentSongIndex === i
                            ? "bg-homeBg/30 "
                            : "bg-homeBg/10"
                        } rounded-full`}
                      ></div>
                    </div>
                  </BlurBackgorund>
                </div>
              </div>
            ))}
          </div>
        </div>
        ;
      </div>
    </div>
  );

  function MusicPlayer() {
    return (
      <div className="w-full flex justify-around items-center my-1">
        <audio
          ref={ref}
          src={songs[currentSongIndex]?.song}
          preload="metadata"
          onContextMenu={(e) => e.preventDefault()}
          controlsList="nodownload"
        />
        {/* Prev */}
        <div
          onClick={handlePrevious}
          className="w-6 h-6 cursor-pointer whitee group"
        >
          <img
            src="assets/icons/prev.png"
            className="w-full h-full object-contain hover-medsos rotate-180 img-shadow-white-on-hover"
          />
        </div>
        {/* Play - Plause */}
        <BlurBackgorund
          onClick={togglePlayPause}
          className="w-15 h-15 flex justify-center items-center cursor-pointer whitee group"
          roundedClass="rounded-full"
        >
          {isPlaying ? (
            <img
              src="assets/icons/pause.png"
              className="w-full h-full object-contain p-3 img-shadow-white-on-hover"
            />
          ) : (
            <img
              src="assets/icons/play.png"
              className="w-full h-full object-contain p-3 ml-1 img-shadow-white-on-hover"
            />
          )}
        </BlurBackgorund>
        {/* Next */}
        <div
          onClick={handleNext}
          className="w-6 h-6 cursor-pointer whitee group"
        >
          <img
            src="assets/icons/prev.png"
            className="w-full h-full object-contain img-shadow-white-on-hover"
          />
        </div>
      </div>
    );
  }

  //       {/* Volume Control */}
  //       <div className="flex items-center space-x-2">
  //         <button
  //           onClick={toggleMute}
  //           className="text-gray-500 hover:text-gray-700 text-lg w-6 flex justify-center"
  //         >
  //           {isMuted || volume === 0 ? 'mute' : 'volume'}
  //         </button>
  //         <input
  //           type="range"
  //           min="0"
  //           max="1"
  //           step="0.1"
  //           value={isMuted ? 0 : volume}
  //           onChange={handleVolumeChange}
  //           className="flex-1 h-1 bg-gray-200 rounded-full appearance-none cursor-pointer [&::-webkit-slider-thumb]:appearance-none [&::-webkit-slider-thumb]:w-4 [&::-webkit-slider-thumb]:h-4 [&::-webkit-slider-thumb]:bg-blue-500 [&::-webkit-slider-thumb]:rounded-full [&::-webkit-slider-thumb]:cursor-pointer [&::-moz-range-thumb]:w-4 [&::-moz-range-thumb]:h-4 [&::-moz-range-thumb]:bg-blue-500 [&::-moz-range-thumb]:rounded-full [&::-moz-range-thumb]:border-none [&::-moz-range-thumb]:cursor-pointer"
  //         />
  //         <span className="text-xs text-gray-500 w-8">
  //           {Math.round((isMuted ? 0 : volume) * 100)}%
  //         </span>
  //       </div>

  //       <style jsx>{`
  //         .slider::-webkit-slider-thumb {
  //           appearance: none;
  //           width: 16px;
  //           height: 16px;
  //           background: #3b82f6;
  //           border-radius: 50%;
  //           cursor: pointer;
  //         }

  //         .slider::-moz-range-thumb {
  //           width: 16px;
  //           height: 16px;
  //           background: #3b82f6;
  //           border-radius: 50%;
  //           border: none;
  //           cursor: pointer;
  //         }

  //         @keyframes spin {
  //           from { transform: rotate(0deg); }
  //           to { transform: rotate(360deg); }
  //         }

  //         .animate-spin {
  //           animation: spin 1s linear infinite;
  //         }
  //       `}</style>
  //     </div>
  //   </div>
  // );
}
