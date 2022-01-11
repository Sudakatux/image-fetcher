import "./App.css";
import { useEffect, useState, useCallback } from "react";
import { ImageCard } from "./components/image-card";
import ImageList from "@mui/material/ImageList";
import CircularProgress from "@mui/material/CircularProgress";

const baseUrl = "http://www.pinkvilla.com/";
const pageSuffix = "/photo-gallery-feed-page/page";
const buildPageUrl = (page) =>
  page === 0 ? `${baseUrl}${pageSuffix}` : `${baseUrl}${pageSuffix}/${page}`;
const fetchImages = async (page) => (await fetch(buildPageUrl(page))).json();

function App() {
  const [currentPage, setPage] = useState(0);
  const [images, setImages] = useState([]);
  const [isFetching, setIsFetching] = useState(false);
  const incrementPage = useCallback(() => {
    setPage((currentPage) => currentPage + 1);
  }, [setPage]);

  const addImagesToBuffer = useCallback(
    (newImages) => {
      setImages(images.concat(newImages));
    },
    [images, setImages]
  );

  const trackScrolling = useCallback(() => {
    const appElement = document.getElementById("app");
    if (
      appElement.getBoundingClientRect().bottom <= window.innerHeight &&
      !isFetching
    ) {
      incrementPage();
    }
  }, [incrementPage, isFetching]);

  useEffect(() => {
    setIsFetching(true);
    fetchImages(currentPage).then(({ nodes }) => {
      addImagesToBuffer(nodes);
      setIsFetching(false);
    });
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  useEffect(() => {
    document.addEventListener("scroll", trackScrolling);
  }, [trackScrolling]);

  return (
    <div className="App" id="app" style={{ height: "100%", display: "flex" }}>
      <div style={{ margin: "0 auto" }}>
        <ImageList sx={{ width: 900 }}>
          {images.map(({ node }) => (
            <ImageCard
              {...node}
              baseUrl={baseUrl}
              key={`${node.nid}${node.title}`}
            />
          ))}
        </ImageList>
        {isFetching ? (
          <div style={{ margin: "auto" }}>
            <CircularProgress />
          </div>
        ) : null}
      </div>

      <div></div>
    </div>
  );
}

export default App;
