import ProfilePage from "./ProfilePage";
import MediaPlayer from "../shared/components/MediaPlayer";
import BottomBar from "../components/BottomBar";
import TrafficLightBtn from "../components/TrafficLightBtn";
const HomePage = () => {
  const mediaUrl = "assets/bg.jpg";
  return (
    <div className="w-screen h-screen bg-cover bg-center relative overflow-hidden">
      <MediaPlayer
        src={mediaUrl}
        className="object-cover h-full w-full"
        autoPlay
      />
      <div className="w-screen h-screen inset-0 backdrop-blur-[80px] bg-black/20 absolute flex flex-col items-center justify-end px-[150px] [@media(max-width:1050px)]:px-[20px]">
        <div className="bg-gradient-to-tr from-homeBg2 to-homeBg border-t-3 border-r-3 border-white h-[80%] w-full rounded-t-[30px] rounded-b-[10px] overflow-hidden flex flex-col">
          <div className="w-full flex items-center justify-between px-15 py-5">
            
            <TrafficLightBtn/>
            <h1 className="font-custom">Project</h1>
          </div>
          <ProfilePage/>
        </div>

       <BottomBar/>
      </div>
    </div>
  );
};

export default HomePage;
