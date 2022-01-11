import logo from "./logo.svg";
import "./App.css";
import { useEffect, useState, useCallback } from "react";

const baseUrl = "http://www.pinkvilla.com/";
const pageSuffix = "/photo-gallery-feed-page/page";
const buildPageUrl = (page) =>
  page === 0 ? `${baseUrl}${pageSuffix}` : `${baseUrl}${pageSuffix}/${page}`;
const fetchImages = async (page) => (await fetch(buildPageUrl(page))).json();

function App() {
  const [currentPage, setPage] = useState(0);
  const [images, setImages] = useState([]);
  // const [isFetching, setIsFetching] = useState(false);
  const incrementPage = useCallback(() => {
    setPage(currentPage=>currentPage + 1);
  }, [setPage]);

  const addImagesToBuffer = useCallback(
    (newImages) => {
      setImages(images.concat(newImages));
    },
    [images, setImages]
  );

  const trackScrolling = useCallback(() => {
    const appElement = document.getElementById("app");
    if (appElement.getBoundingClientRect().bottom <= window.innerHeight) {
      console.log("Gettign called");
      incrementPage();
    }
  }, [incrementPage]);

  useEffect(() => {
    fetchImages(currentPage).then(({ nodes }) => {
      addImagesToBuffer(nodes);
    });
  // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    document.addEventListener("scroll", trackScrolling);
  }, [trackScrolling]);

  return (
    <div className="App" id="app" style={{ height: "100%" }}>
      <div>
        <ul
        // ref={containerRef}
        // onScroll={handleScroll}
        // style={{ height: 1600, border: "1px solid" }}
        >
          {images.map(
            ({ node: { title, path, field_photo_image_section, nid } }) => (
              <li>
                <a href={`${baseUrl}${path}`} id={nid}>
                  {title}
                </a>
                <img
                  src={`${baseUrl}${field_photo_image_section}`}
                  alt={title}
                />
              </li>
            )
          )}
        </ul>
      </div>

      <div></div>
    </div>
  );
}

export default App;
