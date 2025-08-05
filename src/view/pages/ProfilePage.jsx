import TypewriterLoop from "../shared/animations/typewriter";
import BlurBackgorund from "../shared/components/BlurBackgorund";
import ChatOverlay from "../components/ChatOverlay";

const ProfilePage = () => {
  return (
    <div
      className="flex-1 relative overflow-hidden object-cover flex items-center justify-between font-custom w-[90%]"
      // style={{backgroundImage : "url('assets/bg.jpg')"}}
    >
      <div className="w-[100%] pr-5">
          <TypewriterLoop
            text="I'm Delkano"
            speed={100}
            className="font-custom font-medium text-homeBg2 text-5xl"
          />

        <h1 className="text-homeBg2/80 text-[1.2rem]">
          an Information Technology student at Telkom University
        </h1>
        <h1 className="text-homeBg2/80 text-[1.2rem]">
          with a strong passion for technology and innovation.
        </h1>
      </div>
      
      <div className="w-full h-full flex flex-col items-center justify-end">
        <ChatOverlay/>
      </div>

        {/* <BlurBackgorund className="w-200 h-full border-b-0"/> */}
    </div>
  );
};

export default ProfilePage;
