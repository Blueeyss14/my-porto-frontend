const TrafficLightBtn = () => {
  const colors = ["bg-red-500", "bg-yellow-500", "bg-green-500"];
  return (
    <div className='flex'>
      {colors.map((color, index) => (
        <div key={index} className={`${color} h-3 w-3 rounded-full mx-1`}></div>
      ))}
    </div>
  );
};

export default TrafficLightBtn;
