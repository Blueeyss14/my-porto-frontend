import { NameInput } from "../components/NameInput";
import { useChatStore } from "../../state/chatStore";

const ConfirmMessageWindow = () => {
  const { isClicked, toggleIsClicked } = useChatStore();

  return (
    <div
      onClick={() => toggleIsClicked(false)}
      className={`
    absolute w-screen h-screen bg-black/10 backdrop-blur-[30px] overflow-hidden
    transition-opacity duration-300 ease-in-out flex justify-center items-center
    ${
      isClicked
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
    }
  `}
    >
      <div className="w-[90%] h-full flex flex-col justify-center items-center">
        <h1 className="font-custom font-bold text-homeBg2 text-6xl text-center [@media(max-width:700px)]:text-5xl [@media(max-width:550px)]:!text-[1.7rem]">
          This is My Portfolio
        </h1>
        <h1 className="font-custom font-medium text-homeBg2 text-[1.2rem] text-center mt-1 mb-5 [@media(max-width:700px)]:text-[1rem] [@media(max-width:550px)]:!text-[0.7rem]">
          Your message will appear, so kindly keep it positive.
        </h1>
        <div className="w-full max-w-100 [@media(max-width:550px)]:!w-[80%]" onClick={(e) => e.stopPropagation()}>
          <NameInput />
        </div>
      </div>
    </div>
  );
};

export default ConfirmMessageWindow;
