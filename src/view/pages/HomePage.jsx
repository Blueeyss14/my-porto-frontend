import MediaPlayer from "../shared/components/MediaPlayer";
import Navbar from "../components/Navbar";
import BlurBackgorund from "../shared/components/BlurBackgorund";
import { medsos, mapMedsos } from "../../helper/medsos";
import AppBar from "../components/AppBar";
import ProfilePage from "./ProfilePage";
import SongPlaylist from "./SongPlaylist";
import useBottombarStore from "../../state/bottombarStore";
import { useChatStore } from "../../state/chatStore";

const HomePage = () => {
  const { isClicked , toggleIsClicked } = useChatStore();
  const medsosItems = mapMedsos(medsos);
  const mediaUrl = "assets/images/background.png";
  const activeIndex = useBottombarStore((s) => s.activeIndex);

  const pageList = [<ProfilePage />, <SongPlaylist />];

  return (
    <div className="w-screen h-screen bg-cover bg-center relative overflow-hidden">
      <MediaPlayer
        src={mediaUrl}
        className="object-cover h-full w-full absolute"
        autoPlay
      />
      <div className="w-screen h-screen inset-0 backdrop-blur-[50px] bg-black/30 absolute overflow-hidden flex flex-col items-center justify-end">
        <div className="w-[90%] flex justify-between items-center">
          <AppBar />
          {/* MEDSOS */}
          <BlurBackgorund
            className="flex justify-center items-center p-[6px] pl-2 cursor-pointer [@media(max-width:760px)]:w-40 [@media(max-width:760px)]:justify-between"
            roundedClass="rounded-[30px]"
          >
            {medsosItems.map((item) => (
              <div
                onClick={() => window.open(item.site, "_blank")}
                className="flex items-center justify-center hover-medsos group"
              >
                <img
                  src={`${item.icon}`}
                  className="w-8.5 h-8.5 img-shadow-white-on-hover"
                />
                <h1 className="pr-6 pl-2 font-custom text-shadow-white-on-hover text-[0.95rem] [@media(max-width:760px)]:hidden">
                  {item.label}
                </h1>
              </div>
            ))}
            {/* <Navbar/> */}
          </BlurBackgorund>
        </div>
        <BlurBackgorund className="border-b-0 h-[85%] w-[90%] mt-5 flex flex-col items-center">
          <Navbar />
          {pageList[activeIndex]}
        </BlurBackgorund>
        {/* <div className="bg-white/10 border-white/10 border-2 border-b-0 h-[85%] w-[90%] rounded-t-4xl backdrop-blur-[20px] overflow-hidden">
          <Navbar />
        </div> */}
      </div>
      {isClicked && <div 
      onClick={() => toggleIsClicked(false)}
      className="absolute bg-black/10 w-screen h-screen backdrop-blur-[30px] overflow-hidden"></div>}

    </div>
  );
};

export default HomePage;
