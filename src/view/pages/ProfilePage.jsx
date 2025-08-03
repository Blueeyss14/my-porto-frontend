import MyProfile from "../components/MyProfile";

const ProfilePage = () => {
  return (
    <div className="bg-amber-300 flex-1 mx-2 rounded-t-[10px] relative overflow-hidden object-cover flex items-center justify-center"
    style={{backgroundImage : "url('assets/roblox.png')"}}
    >
      <div className="bg-white/5 w-full h-full backdrop-blur-[60px] rounded-t-[10px]">
        <MyProfile />
      </div>
    </div>
  );
};

export default ProfilePage;
