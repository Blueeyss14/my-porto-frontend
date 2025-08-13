import MediaPlayer from "../shared/components/MediaPlayer";
import Navbar from "../components/Navbar";
import BlurBackgorund from "../shared/components/BlurBackgorund";
import { medsos, mapMedsos } from "../../helper/medsos";
import AppBar from "../components/AppBar";
import ProfilePage from "./ProfilePage";
import SongPlaylist from "./SongPlaylist";
import useBottombarStore from "../../state/bottombarStore";
import ConfirmMessageWindow from "./ConfirmMessageWindow";
import { useMediaBackgroundStore } from "../../state/mediaBackgroundStore.js";
import { useEffect } from "react";

const HomePage = () => {
  const medsosItems = mapMedsos(medsos);
  const activeIndex = useBottombarStore((s) => s.activeIndex);

  const { mediaBackground, fetchMediaBackground } = useMediaBackgroundStore();
  useEffect(() => {
    fetchMediaBackground();
  }, [fetchMediaBackground]);
const mediaUrl =
  mediaBackground.length > 0
    ? `http://localhost:3000/mediaBackground/7`
    : "assets/images/background.png";

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
          {pageList.map((page, i) => (
            <div
              key={i}
              style={{ display: activeIndex === i ? "flex" : "none" }}
              className="w-full h-full flex justify-center"
            >
              {page}
            </div>
          ))}
        </BlurBackgorund>
        {/* <div className="bg-white/10 border-white/10 border-2 border-b-0 h-[85%] w-[90%] rounded-t-4xl backdrop-blur-[20px] overflow-hidden">
          <Navbar />
        </div> */}
      </div>
      <ConfirmMessageWindow />
    </div>
  );
};

export default HomePage;
