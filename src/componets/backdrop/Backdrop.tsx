import { CardMedia } from "@mui/material";
import { StyledLink } from "../Navbar/styles";
import { StyledBackdrop, Text } from "./styles";
import def from "../../utils/img/def.png";
import { CardProps } from "../../utils/types";

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
            image={image ? `https://image.tmdb.org/t/p/original${image}` : def}
            alt={title}
            sx={{ maxWidth: type === undefined ? "250px" : "100%" }}
          />
          <Text>{title ? title : name}</Text>
        </StyledBackdrop>
      </StyledLink>
    </>
  );
};
