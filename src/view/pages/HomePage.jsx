import MediaPlayer from "../shared/components/MediaPlayer";
import Navbar from "../components/Navbar";
import BlurBackgorund from "../shared/components/BlurBackgorund";

import { medsos, mapMedsos } from "../../helper/medsos";

const HomePage = () => {
  const medsosItems = mapMedsos(medsos);
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
          <BlurBackgorund
            className="border-b-0 flex justify-between p-[6px] w-45 mb-4"
            roundedClass="rounded-[30px]"
          >
            {medsosItems.map((item) => (
              // <h1 key={item.id}>{item.label}</h1>
              <img src={`${item.icon}`} className="w-9 h-9 bg-medsos hover-medsos" />
            ))}
            {/* <Navbar/> */}
          </BlurBackgorund>
        </div>
        <BlurBackgorund className="border-b-0 h-[85%] w-[90%]">
          {/* <Navbar/> */}
        </BlurBackgorund>
        {/* <div className="bg-white/10 border-white/10 border-2 border-b-0 h-[85%] w-[90%] rounded-t-4xl backdrop-blur-[20px] overflow-hidden">
          <Navbar />
        </div> */}
      </div>
    </div>
  );
};

export default HomePage;
