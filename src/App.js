import "./App.css";
import { useEffect, useCallback } from "react";
import { ImageCard } from "./components/image-card";
import ImageList from "@mui/material/ImageList";
import CircularProgress from "@mui/material/CircularProgress";
import { useImageFetcher } from "./hooks/image-fetcher";

function App() {
  const { isFetching, incrementPage, images } = useImageFetcher();
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
    document.addEventListener("scroll", trackScrolling);
  }, [trackScrolling]);

  return (
    <div className="App" id="app" style={{ height: "100%", display: "flex" }}>
      <div style={{ margin: "0 auto" }}>
        <ImageList sx={{ width: 900 }}>
          {images.map(({ node }) => (
            <ImageCard {...node} key={`${node.nid}${node.title}`} />
          ))}
        </ImageList>
        {isFetching ? (
          <div style={{ margin: "auto" }}>
            <CircularProgress />
          </div>
        ) : null}
      </div>
    </div>
  );
}

export default App;
