import TypewriterLoop from "../shared/animations/typewriter";
import ChatOverlay from "../components/ChatOverlay";
import ChatInput from "../components/ChatInput";

const ProfilePage = () => {
  return (
    <div
      className="flex-1 relative overflow-hidden object-cover flex items-center justify-center font-custom w-full"
      // style={{backgroundImage : "url('assets/bg.jpg')"}}
    >
      <div className="w-[90%] h-full flex items-center  [@media(max-width:850px)]:items-start">
        <div className="w-[50%] pr-5 flex flex-col [@media(max-width:850px)]:items-center [@media(max-width:850px)]:w-full [@media(max-width:850px)]:mt-10">
          <TypewriterLoop
            text="I'm Delkano"
            speed={100}
            className="font-custom font-medium text-homeBg2 text-5xl mb-5 [@media(max-width:1000px)]:text-4xl [@media(max-width:500px)]:text-2xl [@media(max-width:500px)]:mb-2"
          />

          <h1 className="leading-8 [@media(max-width:1000px)]:leading-7 text-homeBg2/80 text-[1.2rem] [@media(max-width:1000px)]:text-[0.9rem] [@media(max-width:850px)]:text-center [@media(max-width:500px)]:text-[0.7rem] [@media(max-width:500px)]:leading-5">
            an Information Technology student at Telkom University
          </h1>
          <h1 className="leading-8 [@media(max-width:1000px)]:leading-7 text-homeBg2/80 text-[1.2rem] [@media(max-width:1000px)]:text-[0.9rem]  [@media(max-width:850px)]:text-center [@media(max-width:500px)]:text-[0.7rem] [@media(max-width:500px)]:leading-5">
            with a strong passion for technology and innovation.
          </h1>
        </div>
      </div>

      <div className="absolute w-[90%] h-full flex flex-col justify-end items-end ">
           <ChatOverlay />
           <ChatInput/>
      </div>


    </div>
  );
};

export default ProfilePage;
