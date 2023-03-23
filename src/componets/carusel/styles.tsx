import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

export const StyledCarusel = styled("div")``;

export const Text = styled(Typography)`
  color: white;
`;
export const StyledSlide = styled("div")`
  margin-right: 10px;
`;

const ArrowLeft = (props: any) => (
  <Button
    {...props}
    className={"prev"}
    sx={{ zIndex: 2, position: "absolute", marginY: 8}}
  >
    <ArrowBackIosRoundedIcon />
  </Button>
);

const ArrowRight = (props: any) => (
  <Button
    {...props}
    className={"prev"}
    sx={{ zIndex: 2, position: "absolute", marginX: 170, marginY: -18 }}
  >
    <ArrowForwardIosRoundedIcon />
  </Button>
);

export const settings = {
  dots: false,
  infinite: false,
  slidesToShow: 4.5,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: true,
  prevArrow: <ArrowLeft />,
  nextArrow: <ArrowRight />,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3.5,
        slidesToScroll: 1,
      },
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2.5,
        slidesToScroll: 1,
        initialSlide: 2,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
      },
    },
  ],
};

/* 
 export const StyledCarusel = styled.div`
  display: flex;
  justify-content: flex-start;
  padding: 50px;
  gap: 20px;
  width: 127px;
  height: 233px;
`
*/
