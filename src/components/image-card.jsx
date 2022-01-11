
import ImageListItem from '@mui/material/ImageListItem';
import ImageListItemBar from '@mui/material/ImageListItemBar';
import { baseUrl } from '../constants';
export const ImageCard = ({ title, path, field_photo_image_section}) =>(
  <ImageListItem>
      <img
      src={`${baseUrl}${field_photo_image_section}`}
      alt={title}/>
<ImageListItemBar
title={       <a href={`${baseUrl}${path}`} style={{color:'white'}}>
                  {title}
                </a>}
                />
  </ImageListItem>
);