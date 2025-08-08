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
    isLoading,
    formatTime,
    togglePlayPause,
    handleSeek,
    handleVolumeChange,
    toggleMute,
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
    <div className="w-[90%] h-full flex font-custom justify-center items-center">
      <div className="flex h-[90%] w-full">
        <div className="h-full w-[350px] flex flex-col">
          {/* Music Profile */}
          <BlurBackgorund
            background="bg-white/3 border-white/5"
            roundedClass="rounded-[20px]"
            className="flex-1 w-full mb-5 p-4 flex flex-col items-center max-h-[550px]"
          >
            <h1 className="mb-4">Your Song</h1>
            <BlurBackgorund
              className="flex-1 w-full"
              roundedClass="rounded-[10px]"
            />
            {/* SLIDER */}
            <div className="w-full flex flex-col items-center justify-center">
              <h1 className="mb-3 mt-7">
                {songs[currentSongIndex]?.song
                  .split("/")
                  .pop()
                  .replace(/\.[^/.]+$/, "")
                  .replace(/[-_]/g, " ")}
              </h1>
              <div
                className="w-full h-1 bg-homeBg overflow-hidden cursor-pointer my-1 rounded-full"
                onDrag={handleSeek}
                onClick={handleSeek}
              >
                <div
                  className="h-full bg-green-300"
                  style={{ width: `${progressPercent}%` }}
                ></div>
              </div>
              <div className="w-full flex items-center justify-between text-[0.9rem]">
                <h1>{formatTime(currentTime)}</h1>
                <h1>{formatTime(duration)}</h1>
              </div>
            </div>
          </BlurBackgorund>
          {/* MUSIC PLAYER BAR */}
          <BlurBackgorund
            roundedClass="rounded-[20px]"
            className="w-full flex justify-around items-center p-3"
          >
            {/* Prev */}
            <BlurBackgorund
              onClick={handlePrevious}
              roundedClass="rounded-full"
              className="w-10 h-10"
            ></BlurBackgorund>
            {/* Play */}
            <BlurBackgorund
              onClick={togglePlayPause}
              roundedClass="rounded-full"
              className="w-10 h-10"
            >
              <audio
                ref={ref}
                src={songs[currentSongIndex]?.song}
                preload="metadata"
                onContextMenu={(e) => e.preventDefault()}
                controlsList="nodownload"
              />
            </BlurBackgorund>
            {/* Next */}
            <BlurBackgorund
              onClick={handleNext}
              roundedClass="rounded-full"
              className="w-10 h-10"
            ></BlurBackgorund>
          </BlurBackgorund>
        </div>
        {/* Playlist */}
        <div className="flex-1 w-full ml-20 flex flex-col">
          <h1 className="font-bold text-[3rem] text-homeBg">Playlist</h1>
          <div className="flex-1 w-full overflow-y-auto scrollbar-hide pb-50 pt-10">
            {songs.map((s, i) => (
              <div
                className="cursor-pointer"
                onClick={() => handleSelectSong(i)}
              >
                <div
                  className={`max-w-100 flex items-center ${
                    currentSongIndex === i
                      ? "text-homeBg/80"
                      : "font-normal text-homeBg/50"
                  }`}
                >
                  <h1 className="mr-4 text-[1.3rem]">#</h1>
                 <BlurBackgorund 
                 background={`${currentSongIndex === i ? "bg-white/5 border-white/3 shadow-white/10 shadow-[0_0_30px_white]" : "bg-white/1 border-white/1"}`}
                 blur="backdrop-blur[50px]"
                 roundedClass="rounded-[5px] border-[1px]"
                 className="w-full flex justify-center items-center px-2 py-1 mb-1">
                   <div className="w-full">
                    <h1 className="overflow-ellipsis line-clamp-1 text-[0.9rem] ">
                      {s.song
                        .split("/")
                        .pop()
                        .replace(/\.[^/.]+$/, "")
                        .replace(/[-_]/g, " ")}
                    </h1>
                    <div className="w-full flex justify-start">
                      <h1 className="text-[10px] mb-1">{`${currentSongIndex === i ? "Playing" : "Queue"}`}</h1>
                    </div>
                    {/* divider */}
                    <div className={`mt-1 mb-0 h-[1px] w-full ${currentSongIndex === i ? 'bg-homeBg/30 ' : 'bg-homeBg/10' } rounded-full`}></div>
                  </div>
                 </BlurBackgorund>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );

  // return (
  //   <div className="flex gap-6 max-w-4xl mx-auto mt-8">
  //     {/* Song List */}
  //     <div className="w-1/3 bg-gray-100 rounded-lg p-4 overflow-auto max-h-[400px]">
  //       <h2 className="text-lg font-semibold mb-4">Playlist</h2>
  //       <ul className="space-y-2">
  // {songs.map((s, i) => (
  //   <li key={i}>
  //     <button
  //       onClick={() => handleSelectSong(i)}
  //       disabled={isLoading}
  //       className={`w-full text-left p-2 rounded transition-colors ${
  //         currentSongIndex === i
  //           ? 'bg-blue-500 text-white'
  //           : 'hover:bg-gray-200 disabled:opacity-50 disabled:cursor-not-allowed'
  //       }`}
  //     >
  //       <div className="flex items-center justify-between">
  //         <span className="truncate">{s.song.split('/').pop().replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')}</span>
  //         {currentSongIndex === i && (
  //           <span className="text-xs ml-2 flex-shrink-0">
  //             {isLoading ? '⏳' : isPlaying ? '🎵' : '⏸'}
  //           </span>
  //         )}
  //       </div>
  //     </button>
  //   </li>
  // ))}
  //       </ul>
  //     </div>

  //     {/* Player */}
  //     <div className="w-2/3 bg-white rounded-xl shadow-lg p-6">
  // <audio
  //   ref={ref}
  //   src={songs[currentSongIndex]?.song}
  //   preload="metadata"
  //   onContextMenu={(e) => e.preventDefault()}
  //   controlsList="nodownload"
  // />

  //       <div className="text-center mb-6">
  //         <h3 className="text-lg font-semibold text-gray-800">
  //           {songs[currentSongIndex]?.song.split('/').pop().replace(/\.[^/.]+$/, '').replace(/[-_]/g, ' ')}
  //         </h3>
  //         <p className="text-sm text-gray-500">
  //           {isLoading ? 'Loading...' : 'Now Playing'}
  //         </p>
  //       </div>

  //       {/* Progress Bar */}
  // <div className="mb-4">
  //   <div
  //     className="w-full h-2 bg-gray-200 rounded-full cursor-pointer"
  //     onClick={handleSeek}
  //   >
  //     <div
  //       className="h-2 bg-blue-500 rounded-full transition-all duration-100"
  //       style={{ width: `${progressPercent}%` }}
  //     ></div>
  //   </div>
  //   <div className="flex justify-between text-xs text-gray-500 mt-1">
  //     <span>{formatTime(currentTime)}</span>
  //     <span>{formatTime(duration)}</span>
  //   </div>
  // </div>

  // <div className="flex items-center justify-center space-x-4 mb-4">
  //   <button
  //     onClick={handlePrevious}
  //     disabled={isLoading}
  //     className="bg-gray-500 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full p-2 transition-colors w-10 h-10 flex items-center justify-center text-sm"
  //   >
  //     ⏮
  //   </button>

  //   <button
  //     onClick={togglePlayPause}
  //     disabled={isLoading}
  //     className="bg-blue-500 hover:bg-blue-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full p-3 transition-colors w-12 h-12 flex items-center justify-center text-lg font-bold relative"
  //   >
  //     {isLoading ? (
  //       <div className="animate-spin rounded-full h-4 w-4 border-b-2 border-white"></div>
  //     ) : isPlaying ? (
  //       '⏸'
  //     ) : (
  //       '▶'
  //     )}
  //   </button>

  //   <button
  //     onClick={handleNext}
  //     disabled={isLoading}
  //     className="bg-gray-500 hover:bg-gray-600 disabled:opacity-50 disabled:cursor-not-allowed text-white rounded-full p-2 transition-colors w-10 h-10 flex items-center justify-center text-sm"
  //   >
  //     ⏭
  //   </button>
  // </div>

  //       {/* Volume Control */}
  //       <div className="flex items-center space-x-2">
  //         <button
  //           onClick={toggleMute}
  //           className="text-gray-500 hover:text-gray-700 text-lg w-6 flex justify-center"
  //         >
  //           {isMuted || volume === 0 ? '🔇' : '🔊'}
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

  //       <div className="mt-4 text-center">
  //         <p className="text-xs text-gray-400">
  //           🔄 Auto-play enabled • Will loop to beginning after last song
  //         </p>
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
