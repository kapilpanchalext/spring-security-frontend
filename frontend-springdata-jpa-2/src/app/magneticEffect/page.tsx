"use client"
import React, { useState } from 'react';

const MagneticEffect = () => {
  const magnetSize = 128;  
  const magnetRadius = 256;
  const magnetPosition = { x: 300, y: 300 };
  const magnetSnapOffsetY = 48;
  const [magnetHeight, setMagnetHeight] = useState<number>(32);
  const [snappedCount, setSnappedCount] = useState<number>(0);

  const [draggables, setDraggables] = useState([
    { id: 1, x: 100, y: 100, isDragging: false, snapOffsetY: 20 },
    { id: 2, x: 400, y: 200, isDragging: false, snapOffsetY: 20 },
    { id: 3, x: 500, y: 400, isDragging: false, snapOffsetY: 20 },
  ]);

  const handleMouseDown = (id: number, event: React.MouseEvent) => {
    event.preventDefault();

    setDraggables((prevDraggables) =>
      prevDraggables.map((draggable) =>
        draggable.id === id ? { ...draggable, isDragging: true } : draggable
      )
    );

    const handleMouseMove = (moveEvent: MouseEvent) => {
      setDraggables((prevDraggables) =>
        prevDraggables.map((draggable) => {

          if (!draggable.isDragging) { 
            return draggable; 
          }

          const newX = moveEvent.clientX;
          const newY = moveEvent.clientY;

          // Left edge of draggable
          const draggableLeftEdge = newX;

          // Right edge of magnet (fixed)
          const magnetRightEdge = magnetPosition.x + magnetSize + 128;

          // Distance between left edge of draggable and right edge of magnet
          const distanceToMagnet = Math.abs(draggableLeftEdge - magnetRightEdge);

          // Define snap points
          const magnetSnapY = magnetPosition.y + magnetSnapOffsetY;
          const draggableSnapY = newY + draggable.snapOffsetY;

          let snappedX = newX;
          let snappedY = newY;

          if(snappedX <= 700 && snappedX >= 500 && snappedY <= 330 && snappedY >= 320) {
            console.log(snappedX, snappedY);
            setSnappedCount((prev) => prev + 1);

            if(magnetHeight < 32){
              setMagnetHeight((prevHeight) => {
                if (snappedCount === 0) {
                  return prevHeight * 2;
                }
                return prevHeight + 32;
              });
            }
          }

          if (distanceToMagnet < magnetRadius && Math.abs(draggableSnapY - magnetSnapY) < 10) {
            // Snap left edge of draggable to right edge of magnet
            snappedX = magnetRightEdge;
            // Align draggable's snap point with the magnet's snap point
            snappedY = magnetSnapY - draggable.snapOffsetY;
          }
          
          return { ...draggable, x: snappedX, y: snappedY };
        })
      );
    };

    const handleMouseUp = () => {
      setDraggables((prevDraggables) =>
        prevDraggables.map((draggable) => ({ ...draggable, isDragging: false }))
      );

      window.removeEventListener("mousemove", handleMouseMove);
      window.removeEventListener("mouseup", handleMouseUp);
    };

    window.addEventListener("mousemove", handleMouseMove);
    window.addEventListener("mouseup", handleMouseUp);
  };

  return (
    <>
      <div className="relative w-screen h-screen flex justify-center items-center">

        {/* Magnet Div (Fixed) */}
        <div
          className={`absolute border-1 border-solid w-64`}
          style={{
            top: magnetPosition.y,
            left: magnetPosition.x,
            height: `${magnetHeight}px`
          }}>
          <p className="text-xs text-gray-500">x: {magnetPosition.x}, y: {magnetPosition.y}</p>

          {/* Visualize snap point */}
          <div
            className="absolute bg-red-500 w-4 h-4 rounded-full"
            style={{
              top: magnetSnapOffsetY,
              left: "100%",
              transform: "translateX(-50%)",
            }}
          />
        </div>

        {/* Draggable Divs */}
        {draggables.map((draggable) => (
          <div
            key={draggable.id}
            className="absolute w-64 h-16 border-1 border-dashed cursor-grab transition-transform ease-in-out duration-300"
            style={{
              top: draggable.y,
              left: draggable.x,
            }}
            onMouseDown={(event) => handleMouseDown(draggable.id, event)}>
              <p>Subject {draggable.id}</p>
              <p className="text-xs text-gray-500">x: {draggable.x}, y: {draggable.y}</p>

            {/* Visualize draggable snap point */}
            <div
              className="absolute bg-blue-500 w-4 h-4 rounded-full"
              style={{
                top: draggable.snapOffsetY,
                left: 0,
                transform: "translateX(-50%)",
              }}>
            </div>
          </div>
        ))}
      </div>
    </>
  );
};

export default MagneticEffect;