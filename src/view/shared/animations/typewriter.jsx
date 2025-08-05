import { useEffect, useState } from 'react';

const TypewriterLoop = ({ text = "", speed = 100, pause = 1000, className = "" }) => {
  const [displayed, setDisplayed] = useState('');
  const [index, setIndex] = useState(0);
  const [isDeleting, setIsDeleting] = useState(false);
  const [showCursor, setShowCursor] = useState(true);

  useEffect(() => {
    const cursorInterval = setInterval(() => {
      setShowCursor(prev => !prev);
    }, 500);
    return () => clearInterval(cursorInterval);
  }, []);

  useEffect(() => {
    const timeout = setTimeout(() => {
      if (!isDeleting) {
        setDisplayed(text.slice(0, index + 1));
        setIndex(index + 1);
        if (index + 1 === text.length) {
          setTimeout(() => setIsDeleting(true), pause);
        }
      } else {
        setDisplayed(text.slice(0, index - 1));
        setIndex(index - 1);
        if (index - 1 === 0) {
          setIsDeleting(false);
        }
      }
    }, speed);

    return () => clearTimeout(timeout);
  }, [index, isDeleting, text, speed, pause]);

  return (
    <h1 className={`${className}`}>
      {displayed}
      <span className={`ml-1 ${showCursor ? 'opacity-100' : 'opacity-0'}`}>|</span>
    </h1>
  );
};

export default TypewriterLoop;
