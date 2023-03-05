import { Card, CardMedia, Typography } from "@mui/material";
import { StyledBackdrop } from './styles'

export type CardProps = {
  id?: number;
  backdropPath?: string;
  originalTitle?: string;
};
//concatenate start url to image

export const Backdrop: React.FC<CardProps> = ({
  id,
  backdropPath: image,
  originalTitle: title,
}) => {
  
  return (
    <>
    <Card key={id} >
      <StyledBackdrop>
      <CardMedia component="img" image={image} alt={title} />
      <Typography>{title}</Typography>
      </StyledBackdrop>
    </Card>
    </>
  );
};