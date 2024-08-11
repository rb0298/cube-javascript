import React, { useState, useEffect, memo } from "react";
import Spinner from "./Spinner"; // Import your SpinnerMini component
import { fetchImages } from "../services/api";

function ImageContainer() {
  const [data, setData] = useState([]);

  const [loadingImages, setLoadingImages] = useState({}); // Track loading state for each image
  const [errorMsg, setErrorMsg] = useState("");

  useEffect(() => {
    let pageNumber = 1;

    async function getImages() {
      try {
        setErrorMsg("");

        setLoadingImages(true);
        const images = await fetchImages(pageNumber);
        console.log(images);
        pageNumber++;
        setLoadingImages(
          images.reduce((acc, image) => {
            acc[image.id] = true; // Set loading to true initially
            return acc;
          }, {})
        );

        setData(images);
      } catch (error) {
        setErrorMsg("Something went wrong, Please try again later");
        setLoadingImages({});
      }
    }

    getImages();

    const id = setInterval(getImages, 10000);
    return () => clearInterval(id);
  }, []);

  const handleImageLoad = (id) => {
    setLoadingImages((prev) => ({ ...prev, [id]: false }));
  };

  const handleImageError = (id) => {
    setErrorMsg("Failed to load image");
    setLoadingImages((prev) => ({ ...prev, [id]: false }));
  };

  return (
    <>
      <div className="main-container">
        {data.map((ele) => (
          <div
            className={`image-container ${
              loadingImages[ele.id] ? "mini-spinner" : ""
            }`}
            key={ele.id}
          >
            <img
              src={ele.download_url}
              alt={ele.author}
              onLoad={() => handleImageLoad(ele.id)} // Mark image as loaded
              onError={() => handleImageError(ele.id)} // Handle errors
            />
          </div>
        ))}
      </div>
      {errorMsg && <p className="error-msg">{errorMsg}</p>}
    </>
  );
}

export default memo(ImageContainer);
