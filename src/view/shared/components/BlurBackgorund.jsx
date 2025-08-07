const BlurBackgorund = ({
  children,
  className,
  roundedClass = "rounded-t-4xl",
  blur = "backdrop-blur-[20px]",
  background = "bg-white/10 border-white/10",
  onClick,
}) => {
  return (
    <div
      onClick={onClick}
      className={`${background} border-2 ${className} ${roundedClass} ${blur} overflow-hidden`}
    >
      {children}
    </div>
  );
};

export default BlurBackgorund;
