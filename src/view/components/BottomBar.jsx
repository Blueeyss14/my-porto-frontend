import { mapBottombarData, bottombarData } from "../../helper/bottombarData";

const BottomBar = () => {
  const items = mapBottombarData(bottombarData);
  // const colors = ["bg-amber-500", "bg-red-500"];
  return (
    // <div className="flex  items-center justify-center w-[50%] h-17 my-5 overflow-hidden bg-gradient-to-tr from-homeBg2 to-homeBg border-t-4 border-r-4 border-white rounded-2xl [@media(max-width:1050px)]:w-[100%]">
    <div className="flex items-center justify-center w-[50%] h-17 my-5 overflow-hidden backdrop-blur-[80px] bg-gradient-to-tr from-homeBg2/50 to-homeBg/50  border-2 border-white/20 rounded-2xl [@media(max-width:1050px)]:w-[100%]">
      {items.map((item) => (
        <div className={`h-full flex flex-1 justify-center items-center `}>
          <img src={`${item.icon}`} className="w-10 h-10" />
        </div>
      ))}
    </div>
  );
};

export default BottomBar;
