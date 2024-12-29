import React, { useEffect, useState } from "react";
import Header from "../Header/Header";
import styles from "./ImageSearch.module.css";

const ImageSearch = () => {
  const [imageTitle, setImageTitle] = useState("");
  const [renderImages, setRenderImages] = useState([]);
  const [hasNoImages, setHasNoImages] = useState(false);

  const apiKey = import.meta.env.VITE_IMAGESEARCH_KEY;

  useEffect(() => {
    async function getImages() {
      const res = await fetch(
        `https://api.unsplash.com/photos?client_id=${apiKey}&per_page=30`
      );
      const data = await res.json();
      setRenderImages(data);
    }
    getImages();
  }, []);

  function handleChange(event) {
    setImageTitle(event.target.value);
  }

  function handleSearch() {
    getSearchedImages();
  }

  const getSearchedImages = async () => {
    const res = await fetch(
      `https://api.unsplash.com/search/photos?query=${imageTitle}&client_id=${apiKey}&per_page=9`
    );
    const data = await res.json();
    setRenderImages(data.results);
    setHasNoImages(false);
    if (data.results.length === 0) {
      setHasNoImages(true);
    }
  };

  return (
    <>
      <Header />
      <div className={styles.container}>
        <div className={styles.searchBox}>
          <input
            type="text"
            className={styles.textInput}
            name="imageTitle"
            placeholder="Search images"
            onChange={handleChange}
            value={imageTitle}
            id="imageTitle"
          />
          <button className={styles.button} onClick={handleSearch}>
            Search
          </button>
        </div>
        <div className={styles.photosContainer}>
          {renderImages.length > 0 &&
            renderImages.map((item) => {
              return (
                <div className={styles.item} key={item.id}>
                  <img
                    src={item.urls.regular}
                    alt={item.alt_description}
                    title={item.alt_description}
                    width="100%"
                    height="330px"
                  />
                </div>
              );
            })}
          {hasNoImages && (
            <div className={styles.errorText}>
              No images found. Please search again.
            </div>
          )}
        </div>
      </div>
    </>
  );
};

export default ImageSearch;
