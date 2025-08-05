import MyProfile from "../components/MyProfile";

const ProfilePage = () => {
  return (
    <div className="flex-1 mx-2 rounded-t-[10px] relative overflow-hidden object-cover flex items-center justify-center"
    // style={{backgroundImage : "url('assets/bg.jpg')"}}
    >
      <div className="w-full h-full rounded-t-[10px]">
        <MyProfile />
      </div>
    </div>
  );
};

export default ProfilePage;
