import { Card, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { StyledBackdrop } from "./styles";

export type CardProps = {
  id?: number;
  backdropPath?: string;
  title?: string;
};
//concatenate start url to image

export const Backdrop: React.FC<CardProps> = ({
  id,
  backdropPath: image,
  title,
}) => {
  //rendere dinamico movie || serie
  return (
    <>
      <Link to={`/movies/${id}`} >
        <Card key={id}>
          <StyledBackdrop>
            <CardMedia component="img" image={image} alt={title} />
            <Typography>{title}</Typography>
          </StyledBackdrop>
        </Card>
      </Link>
    </>
  );
};
