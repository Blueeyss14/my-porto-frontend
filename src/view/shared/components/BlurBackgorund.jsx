const BlurBackgorund = ({children, className, roundedClass = 'rounded-t-4xl'}) => {
  return (
    <div className={`bg-white/10 border-white/10 border-2 ${className} ${roundedClass} backdrop-blur-[20px] overflow-hidden`}>
      {children}
    </div>
  )
}

export default BlurBackgorund
