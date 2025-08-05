import MediaPlayer from "../shared/components/MediaPlayer";
import Navbar from "../components/Navbar";
const HomePage = () => {
  const mediaUrl = "assets/images/background.png";
  return (
    <div className="w-screen h-screen bg-cover bg-center relative overflow-hidden">
      <MediaPlayer
        src={mediaUrl}
        className="object-cover h-full w-full"
        autoPlay
      />
      <div className="w-screen h-screen inset-0 backdrop-blur-[50px] bg-black/30 absolute overflow-hidden flex flex-col items-center justify-end">
        <div className="w-[90%] flex justify-end items-center">
          <div className="bg-white/10 border-white/10 border-2 border-b-0 rounded-t-4xl backdrop-blur-[20px] overflow-hidden">
          <h1>sdfjkl</h1>
          </div>
        </div>
        <div className="bg-white/10 border-white/10 border-2 border-b-0 h-[85%] w-[90%] rounded-t-4xl backdrop-blur-[20px] overflow-hidden">
          <Navbar />
        </div>
      </div>
    </div>
  );
};

export default HomePage;
