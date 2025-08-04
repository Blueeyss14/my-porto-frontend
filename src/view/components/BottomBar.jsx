import { mapBottombarData, bottombarData } from "../../helper/bottombarData";

const BottomBar = () => {
  const items = mapBottombarData(bottombarData);
  return (
    <div className="flex  items-center justify-center w-[50%] h-17 my-5 bg-gradient-to-tr from-homeBg2 to-homeBg border-t-4 border-r-4 border-white rounded-2xl [@media(max-width:1050px)]:w-[100%]">
      {items.map((item) => (
        <div className="h-full flex flex-1 justify-center items-center">
          <h1>{item.label}</h1>
        </div>
      ))}
    </div>
  );
};

export default BottomBar;
