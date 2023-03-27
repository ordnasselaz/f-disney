import { CardMedia } from "@mui/material";
import { Link } from "react-router-dom";
import { StyledLink } from "../Navbar/styles";
import { StyledBackdrop, Text } from "./styles";

export type CardProps = {
  id?: number;
  backdrop_path?: string;
  title?: string;
  type?: string;
  media_type?: string;
  name?: string;
};

export const Backdrop: React.FC<CardProps> = ({
  id,
  backdrop_path: image,
  title,
  type,
  name,
}) => {
  return (
    <>
      <StyledLink to={`/${type}/${id}`}>
        <StyledBackdrop>
          <CardMedia
            component="img"
            image={`https://image.tmdb.org/t/p/original${image}`}
            alt={title}
          />
          <Text>{title ? title : name}</Text>
        </StyledBackdrop>
      </StyledLink>
    </>
  );
};
