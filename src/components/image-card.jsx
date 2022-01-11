
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';

export const ImageCard = ({ title, path, field_photo_image_section,baseUrl }) =>(
  <ImageListItem>
      <img
      heigh="200px"
      width="200px"
      src={`${baseUrl}${field_photo_image_section}`}
      alt={title}/>
<ImageListItemBar
title={       <a href={`${baseUrl}${path}`}>
                  {title}
                </a>}
                />
  </ImageListItem>
);