import Navbar from "../components/Navbar";
import BlurBackgorund from "../shared/components/BlurBackgorund";
import { medsos, mapMedsos } from "../../helper/medsos";
import AppBar from "../components/AppBar";
import ProfilePage from "./ProfilePage";
import SongPlaylist from "./SongPlaylist";
import useBottombarStore from "../../state/bottombarStore";
import ConfirmMessageWindow from "./ConfirmMessageWindow";
import MediaPlayerDB from "../components/MediaPlayerDB";
import MediaPlayer from "../shared/components/MediaPlayer";
import { useEffect, useRef } from "react";

const HomePage = () => {
  const medsosItems = mapMedsos(medsos);
  const activeIndex = useBottombarStore((s) => s.activeIndex);
  const homePageRef = useRef(null);

    useEffect(() => {
    if (homePageRef.current) {
      homePageRef.current.style.position = 'fixed';
      homePageRef.current.style.top = '0';
      homePageRef.current.style.left = '0';
      homePageRef.current.style.zIndex = '1000';
    }

    return () => {
    };
  }, []);


  const pageList = [<ProfilePage />, <SongPlaylist />];

  return (
    <div className="w-screen h-[calc(var(--vh)*100)] bg-cover bg-center relative overflow-hidden">
      <MediaPlayer className="absolute inset-0 -z-999 w-full h-full" src="/images/background.png"/>
      <div className="absolute inset-0 -z-10 w-full h-full">
        <MediaPlayerDB />
      </div>
      <div className="w-screen h-[calc(var(--vh)*100)] inset-0 backdrop-blur-[50px] bg-black/25 absolute overflow-hidden flex flex-col items-center justify-end">
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
