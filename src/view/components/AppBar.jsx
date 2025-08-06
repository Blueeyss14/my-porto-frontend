import BlurBackgorund from "../shared/components/BlurBackgorund";
import { appBar, mapAppbar } from "../../helper/appbarData";
import useBottombarStore from "../../state/bottombarStore";

const AppBar = () => {
  const activeIndex = useBottombarStore((s) => s.activeIndex);
  const setClickedIndex = useBottombarStore((s) => s.setClickedIndex);
  const appbarItems = mapAppbar(appBar);
  return (
    <BlurBackgorund
      className="flex justify-center items-center p-[6px]"
      roundedClass="rounded-[30px]"
    >
      {appbarItems.map((item, idx) => (
        <div
          key={idx}
          className={`flex items-center justify-center group ${
            activeIndex === idx ? "whitee" : "grayy"
          } cursor-pointer w-30 [@media(max-width:760px)]:w-15`}
          onClick={() => setClickedIndex(idx)}
        >
          <img src={`${item.icon}`} className={`w-8 h-8.5 ${activeIndex === idx ? 'img-shadow-white-on-hover' : ''}`} />
          <h1 className={`pl-2 font-custom text-[0.95rem] [@media(max-width:760px)]:hidden ${activeIndex === idx ? 'text-shadow-white-on-hover' : ''} `}>
            {item.label}
          </h1>
        </div>
      ))}
    </BlurBackgorund>
  );
};

export default AppBar;
