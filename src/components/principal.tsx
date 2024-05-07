"use client"
import React, { useState, MouseEventHandler } from "react";
import Image from "next/image";
import background from '../../public/dragonCity.png';
import Modal from 'react-modal';
import styles from './css/Sheet.module.css';
//Modal.setAppElement('#__next');

const Place = () => {
  const [modalIsOpen,setIsOpen] = useState(false);
  const [selectedImage, setSelectedImage] = useState<string | null>(null); // Adjusted type to accept string or null
  const [showcursorMarker, setShowcursorMarker] = useState(false);
  const [cursorPosition, setCursorPosition] = useState({ x: 0, y: 0 });
  const [structures, setStructures] = useState<{ x: number; y: number }[]>([]);

  const handleMouseMove: MouseEventHandler = (e) => {
    setCursorPosition({ x: e.pageX, y: e.pageY });
  };

  
  function openModal() {
    setIsOpen(true);
  }

  function closeModal(){
    setIsOpen(false);
  }

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

      <div>
      <button onClick={openModal}>Bulding availables</button>
      <Modal
        isOpen={modalIsOpen}
        onRequestClose={closeModal}
        contentLabel="Example Modal"
      >
        <button onClick={closeModal} className="buildings">close</button>
        <div>I am a modal</div>
        {selectedImage && <img src={selectedImage} alt="Selected" style={{ width: '100px', height: 'auto' }} />}
        <button onClick={() => setSelectedImage('/build1.png')}>Image 1</button>
        <button onClick={() => setSelectedImage('/build2.jpg')}>Image 2</button>
        <button onClick={() => setSelectedImage('/buil3.jpg')}>Image 3</button>
      </Modal>
    </div>


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

      <div className={styles.imageContainer}>
        <Image
          src={background}
          alt="clash_map"
          layout="fill"
          objectFit="cover"
          objectPosition="center"
          className={styles.yourImageClass}
          onClick={() => {
            showcursorMarker ? handleClick() : null;
          }}
          onMouseMove={handleMouseMove}
        />
      </div>

    </div>
    
  );
};

export default Place;
