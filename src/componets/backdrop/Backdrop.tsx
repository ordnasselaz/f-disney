import { Card, CardMedia, Typography } from "@mui/material";
import { Link } from "react-router-dom";
import { StyledBackdrop } from "./styles";

export type CardProps = {
  id?: number;
  backdrop_path?: string;
  title?: string;
};
//concatenate start url to image

export const Backdrop: React.FC<CardProps> = ({
  id,
  backdrop_path: image,
  title,
}) => {
  return (
    <>
      <Link to={`/movies/${id}`}>
        <Card>
          <StyledBackdrop>
            <CardMedia
              component="img"
              image={`https://image.tmdb.org/t/p/original${image}`}
              alt={title}
            />
            <Typography>{title}</Typography>
          </StyledBackdrop>
        </Card>
      </Link>
    </>
  );
};
