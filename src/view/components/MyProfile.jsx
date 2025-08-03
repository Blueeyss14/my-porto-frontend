const MyProfile = () => {
  return (
    <div className="h-full w-full flex justify-between items-end overflow-hidden px-30 [@media(max-width:1420px)]:px-10 [@media(max-width:800px)]:flex-col [@media(max-width:800px)]:items-center [@media(max-width:600px)]:px-3">
      <div className="h-[70%] flex-1 flex flex-col justify-center">
        <h1 className="font-custom font-semibold text-6xl pr-5 [@media(max-width:500px)]:text-3xl [@media(max-width:600px)]:pr-0">I'm Delkano</h1>
        <div className="pr-20 [@media(max-width:600px)]:pr-5">
          <p className="text-justify pt-5 pb-1 ">
            an Information Technology student at Telkom University
          </p>
          <p className="text-justify">
            with a strong passion for technology and innovation.
          </p>
        </div>

        {/* <iframe
          src="https://www.youtube.com/embed/ewxmv2tyeRs?autoplay=1&mute=1"
          allow="autoplay"
        //   style={{ width: 0, height: 0, visibility: "hidden" }}
        /> */}
      </div>
      <div className="h-[70%] w-120 bg-homeBg rounded-t-[20px] overflow-hidden [@media(max-width:1240px)]:h-[60%] [@media(max-width:600px)]:w-[100%]">
        <img src="assets/roblox.png" className="h-full w-full object-cover" />
      </div>
    </div>
  );
};

export default MyProfile;
