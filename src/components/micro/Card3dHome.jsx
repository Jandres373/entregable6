import React, { useState, useEffect } from 'react';
import SVG from "../../assets/react.svg"

const Card3dHome = () => {
  const [isHovered, setIsHovered] = useState(false);
  const [mousePosition, setMousePosition] = useState({ x: 0, y: 0 });

  useEffect(() => {
    const handleMouseMove = (e) => {
      setMousePosition({ x: e.clientX, y: e.clientY });
    };

    window.addEventListener('mousemove', handleMouseMove);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
    };
  }, []);

  const cardStyles = {
    transform: `rotateY(${isHovered ? 10 : 0}deg) rotateX(${isHovered ? -10 : 0}deg)`,
  };

  const handleMouseEnter = () => {
    setIsHovered(true);
  };

  const handleMouseLeave = () => {
    setIsHovered(false);
  };

  return (
    <div
    className="relative w-64 cursor-pointer h-80"
    onMouseEnter={handleMouseEnter}
    onMouseLeave={handleMouseLeave}
    src={SVG} 
      alt="Card"
  >
    <div
      className="absolute inset-0 bg-black rounded-lg opacity-50"
      style={{
        transform: `translateX(${(mousePosition.x - window.innerWidth / 2) / 20}px) translateY(${(mousePosition.y - window.innerHeight / 2) / 20}px)`,
      }}
    ></div>
    <div className="absolute inset-0 flex flex-col items-center justify-center p-4 text-white">
      <h2 className="text-2xl font-semibold">🤫</h2>
      <p className="text-sm">Under construction</p>
    </div>
  </div>
);
};

export default Card3dHome;
