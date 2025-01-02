"use client";

import { useRef, useState } from "react";
import s from "./imagePicker.module.css";
import Image from "next/image";
const ImagePicker = ({ label, name }) => {
  const [pickedImage, setPickedImage] = useState(null);
  const imageInput = useRef();

  const handleImagePicker = () => {
    imageInput.current.click();
  };

  const handleImageChange = (e) => {
    const file = e.target.files[0];
    if (!file) {
      setPickedImage(null);
      return;
    }

    const reader = new FileReader();
    reader.onload = (e) => {
      setPickedImage(e.target.result);
    };
    reader.readAsDataURL(file);
  };

  return (
    <div className={s.picker}>
      <label htmlFor={name}>{label}</label>
      <div className={s.controls}>
        <div className={s.preview}>
          {pickedImage ? (
            <Image src={pickedImage} fill alt="Selected Image" />
          ) : (
            <p>No Image Picked</p>
          )}
        </div>
        <input
          className={s.input}
          type="file"
          id={name}
          name={name}
          accept="image/png, image/jpeg, image/jpg"
          ref={imageInput}
          onChange={handleImageChange}
        />
        <button type="button" className={s.button} onClick={handleImagePicker}>
          Choose an Image{" "}
          <span style={{ fontSize: "12px" }}>
            <br />
            (Maximum Size 0.5MB)
          </span>
        </button>
      </div>
    </div>
  );
};

export default ImagePicker;
