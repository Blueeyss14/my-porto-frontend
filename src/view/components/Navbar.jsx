import { useNavigate } from "react-router-dom";
import TrafficLightBtn from "./TrafficLightBtn";

const Navbar = () => {
  const navigate = useNavigate();
  return (
    <div className="flex justify-between w-full items-center p-8 font-custom">
      <TrafficLightBtn />
      <div onClick={() => navigate("/projects")} className="flex justify-center items-center hover-medsos cursor-pointer group">
        <h1 className=" mr-2 text-shadow-white-on-hover">My Project</h1>
        <img src="assets/icons/next.png" className="w-4 h-4 img-shadow-white-on-hover" />
      </div>
    </div>
  );
};

export default Navbar;
