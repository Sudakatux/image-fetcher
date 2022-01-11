import { useEffect, useState, useCallback } from "react";
import { fetchImages } from "../helpers";

export const useImageFetcher = () => {
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

  useEffect(() => {
    if (!isFetching) {
      setIsFetching(true);
      fetchImages(currentPage).then(({ nodes }) => {
        addImagesToBuffer(nodes);
        setIsFetching(false);
      });
    }
    // eslint-disable-next-line react-hooks/exhaustive-deps
  }, [currentPage]);

  return { incrementPage, currentPage, isFetching, images };
};
