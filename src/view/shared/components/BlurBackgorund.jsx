const BlurBackgorund = ({children, className, roundedClass = 'rounded-t-4xl', blur='backdrop-blur-[20px]'}) => {
  return (
    <div className={`bg-white/10 border-white/10 border-2 ${className} ${roundedClass} ${blur} overflow-hidden`}>
      {children}
    </div>
  )
}

export default BlurBackgorund
