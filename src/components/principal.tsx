"use client"

import React, { useEffect, useState, MouseEventHandler } from "react";
import Image from "next/image";
import background from '../../public/dragonCity.png';




const Place = () => {
  const [showcursorMarker, setShowcursorMarker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [structures, setStructures] = useState<{ x: number; y: number }[]>([]);

  const handleMouseMove: MouseEventHandler = (e) => {
    setCursorPosition({ x: e.pageX, y: e.pageY });
  };

  const handleClick = () => {
    setStructures([...structures, { x: cursorPosition.x, y: cursorPosition.y }]);
    setShowcursorMarker(false);
    document.removeEventListener("click", handleClick);
  };

  const handleButtonClick = () => {
    setShowcursorMarker((current) => !current);
  };

  return (
    <div className="w-full h-full relative">
      <button
        className="absolute bg-blue-50 text-white px-4 py-2 rounded-md ml-4"
        onClick={handleButtonClick}
      >
        Agregar
      </button>

      {showcursorMarker && (
        <div
          className="flex justify-center items-center w-full h-full relative"
          style={{ left: cursorPosition.x, top: cursorPosition.y }}
        ></div>
      )}

      {structures.map((struc, index) => (
        <div
          key={index}
          className="absolute w-4 h-4 bg-blue-500 rounded-full"
          style={{ left: struc.x, top: struc.y }}
        ></div>
      ))}

      <Image
        src={background}
        alt="clash_map"
        width={1000}
        height={1000}
        onClick={() => {
          showcursorMarker ? handleClick() : null;
        }}
        onMouseMove={handleMouseMove}
        className="cover w-full h-full"
        style={{ maxWidth: "400%", maxHeight: "200%" }}
      />
    </div>
  );
};

export default Place;
