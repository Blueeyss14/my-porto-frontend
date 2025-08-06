const TrafficLightBtn = () => {
  const colors = ["bg-red-500", "bg-yellow-500", "bg-green-500"];
  const shadows = ["shadow-red-500/80", "shadow-yellow-500/80", "shadow-green-500/80"];
  return (
    <div className='flex group cursor-pointer'>
      {colors.map((color, index) => (
        <div key={index} className={`${color} h-3 w-3 rounded-full mx-1 group-hover:shadow-[0_0_25px_white] ${shadows[index]}`}></div>
      ))}
    </div>
  );
};

export default TrafficLightBtn;
