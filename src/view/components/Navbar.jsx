import TrafficLightBtn from "./TrafficLightBtn"

const Navbar = () => {
  return (
    <div className="flex justify-between w-full items-center p-8 font-custom">
        <TrafficLightBtn/>
        <h1 className="text-homeBg2">My Project</h1>
    </div>
  )
}

export default Navbar
