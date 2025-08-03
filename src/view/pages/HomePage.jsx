import MediaPlayer from "../shared/components/MediaPlayer";
const HomePage = () => {
  const mediaUrl = "assets/roblox.png";
  return (
    <div className="w-screen h-screen bg-cover bg-center relative overflow-hidden">
      <MediaPlayer
        src={mediaUrl}
        className="object-cover h-full w-full"
        autoPlay
      />
      <div className="w-screen h-screen inset-0 backdrop-blur-[60px] bg-white/10 absolute flex flex-col items-center justify-end px-[150px]">
        <div className="bg-homeBg h-[80%] w-full rounded-t-[30px] overflow-hidden flex flex-col">
          <div className="w-full flex justify-end pr-10 py-5">
            <h1>Project</h1>
          </div>
          <div className="bg-amber-300 flex-1 mx-2 rounded-t-[10px]">
            
          </div>
        </div>

        <div className="w-full h-3 bg-green-400 my-5"></div>
      </div>
    </div>
  );
};

export default HomePage;
