"use client"
import React, { useState } from 'react';

const MovableDiv = () => {
  const [position, setPosition] = useState({ x: 100, y: 100 });

  const handleMouseDown = (event: React.MouseEvent) => {
    event.preventDefault();

    const handleMouseMove = (moveEvent: MouseEvent) => {
      setPosition({
        x: moveEvent.clientX - 50,
        y: moveEvent.clientY - 50,
      });
    };

    const handleMouseUp = () => {
      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };
  
  return (
    <>
      <div className="absolute top-[300px] left-[300px] w-32 h-16 border-1 border-solid w-64 text-black flex justify-center items-center cursor-grab">
        <p>Magnetic Block</p>
        <div
          className="absolute right-0 top-1/2 translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-red-500/50 border border-red-500 rounded-full">
        </div>
          <p className="text-xs text-gray-500">
            Red Dot: ({position.x + 64}, {position.y + 32})
          </p>
      </div>
      <div className="relative w-screen h-screen flex justify-center items-center">
        <div
          className="absolute w-32 h-16 border-1 border-solid w-64 text-black flex justify-center items-center cursor-grab"
          style={{ top: position.y, left: position.x }}
          onMouseDown={handleMouseDown}>
            <p>{position.x}, {position.y}</p>
            {/* Left Edge Center Point */}
            <div
              className="absolute left-0 top-1/2 -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-500/50 border border-blue-500 rounded-full">
            </div>
        </div>
      </div>
    </>
  );
};

export default MovableDiv;