import { NameInput } from "../components/NameInput";
import { useChatStore } from "../../state/chatStore";

const ConfirmMessageWindow = () => {
  const { isClicked, toggleIsClicked } = useChatStore();
  return (
    <div
      onClick={() => toggleIsClicked(false)}
      className={`
    absolute w-screen h-screen bg-black/10 backdrop-blur-[30px] overflow-hidden z-50
    transition-opacity duration-300 ease-in-out
    ${
      isClicked
        ? "opacity-100 pointer-events-auto"
        : "opacity-0 pointer-events-none"
    }
  `}
    >
      <div onClick={(e) => e.stopPropagation()}>
        <NameInput />
      </div>
    </div>
  );
};

export default ConfirmMessageWindow;
