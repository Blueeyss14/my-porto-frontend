import TypewriterLoop from "../shared/animations/typewriter";
import BlurBackgorund from "../shared/components/BlurBackgorund";
import ChatOverlay from "../components/ChatOverlay";

const ProfilePage = () => {
  return (
    <div
      className="flex-1 relative overflow-hidden object-cover flex items-center justify-between font-custom w-[90%]"
      // style={{backgroundImage : "url('assets/bg.jpg')"}}
    >
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

      <div className="absolute w-[100%] h-full flex flex-col justify-end items-end">
        <div className="w-[40%]">
          <ChatOverlay />

          <BlurBackgorund
            background="bg-white/5 border-white/5"
            blur=""
            className="w-full p-2 h-30"
            roundedClass="rounded-[1p5x]"
          >
            <div className="h-10 w-60 border-2 border-homeBg2/20 rounded-[5px] flex justify-center items-center">
              <form className="whitee">
                <input
                  className="w-full border-0 border-transparent focus:outline-none focus:ring-0"
                  placeholder="Your Name"
                ></input>
              </form>
            </div>
            <div className=" h-10 border-2 border-homeBg2/20 rounded-[5px] ">
              <form className="whitee">
                <input
                  className="w-full border-0 border-transparent focus:outline-none focus:ring-0"
                  placeholder="Your Name"
                ></input>
              </form>
            </div>
            {/* <div className="border-2 border-homeBg2/20 rounded-[5px]">
              <form className="whitee">
                <input
                  className="border-0 border-transparent focus:outline-none focus:ring-0"
                  placeholder="Your Name"
                ></input>
              </form>
            </div> */}
          </BlurBackgorund>
        </div>
      </div>

      {/* <BlurBackgorund className="w-200 h-full border-b-0"/> */}
    </div>
  );
};

export default ProfilePage;
