import TypewriterLoop from "../shared/animations/typewriter";
import BlurBackgorund from "../shared/components/BlurBackgorund";
import ChatOverlay from "../components/ChatOverlay";

const ProfilePage = () => {
  return (
    <div
      className="flex-1 relative overflow-hidden object-cover flex items-center justify-center font-custom w-full"
      // style={{backgroundImage : "url('assets/bg.jpg')"}}
    >
      <div className="w-[95%] h-full flex items-center">
        <div className="w-[50%] pr-5">
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
      </div>

      <div className="absolute w-[90%] h-full flex flex-col justify-end items-end ">
          <ChatOverlay />
          <div className="flex w-full items- justify-end mb-2 font-custom text-[1rem]">
            <div className="w-80 [@media(max-width:800px)]:w-full border-2 border-homeBg2/50 rounded-full px-5 py-2 mr-5">
              <form className="whitee">
                <input
                  className="w-full border-0 border-transparent focus:outline-none focus:ring-0"
                  placeholder="Message"
                ></input>
              </form>
            </div>
            <div>
              <BlurBackgorund
              className="p-5 w-5 h-5"
              roundedClass="rounded-full"
              >
              </BlurBackgorund>
            </div>
          </div>
      </div>

    </div>
  );
};

export default ProfilePage;
