const MyProfile = () => {
  return (
    <div className="h-full w-full flex justify-between items-end overflow-hidden px-30">
      <div className="h-[70%] flex-1 flex flex-col justify-center">
        <h1 className="font-custom font-semibold text-6xl">I'm Delkano</h1>
        <p className="pr-60 py-5 text-justify leading-8 ">
          I'm a 2nd-year Information Technology student at Telkom University with a GPA of 3.59 and a strong passion for technology,
including software development, design, music production, and 3D modeling and animation. Skilled in game development and
creating interactive environments, I’m dedicated to continuous learning, improvement, and delivering quality results.
        </p>
        {/* <iframe
          src="https://www.youtube.com/embed/ewxmv2tyeRs?autoplay=1&mute=1"
          allow="autoplay"
        //   style={{ width: 0, height: 0, visibility: "hidden" }}
        /> */}
      </div>
      <div className="h-[70%] w-120 bg-homeBg rounded-t-[20px] overflow-hidden">
        <img src="assets/roblox.png" className="h-full w-full object-cover" />
      </div>
    </div>
  );
};

export default MyProfile;
