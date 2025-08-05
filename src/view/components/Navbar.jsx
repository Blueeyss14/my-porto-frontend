import TrafficLightBtn from "./TrafficLightBtn";

const Navbar = () => {
  return (
    <div className="flex justify-between w-full items-center p-8 font-custom">
      <TrafficLightBtn />
      <div className="flex justify-center items-center hover-medsos cursor-pointer">
        <h1 className=" mr-2">My Project</h1>
        <img src="assets/icons/next.png" className="w-4 h-4" />
      </div>
    </div>
  );
};

export default Navbar;
