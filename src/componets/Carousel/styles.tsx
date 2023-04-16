import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

export const Text = styled(Typography)`
  color: white;
  text-decoration: none;
  padding-bottom: 1%;
  margin: 2%;
`;

const ArrowLeft = ({ currentSlide, slideCount, ...props }: any) => {
  const isDisabled = currentSlide === 0;
  return (
    <Button
      {...props}
      className={"prev"}
      disabled={isDisabled}
      sx={{
        zIndex: 2,
        position: "absolute",
        //left: "2%",
        //top: "36%",
        top: "50%",
      }}
    >
      <ArrowBackIosRoundedIcon />
    </Button>
  );
};

const ArrowRight = ({ currentSlide, slideCount, ...props }: any) => {
  const isDisabled = currentSlide + settings.slidesToShow >= slideCount;

  return (
    <Button
      {...props}
      className={"prev"}
      disabled={isDisabled}
      sx={{
        zIndex: 2,
        position: "absolute",
        right: "2%",
        bottom: "40%",
      }}
    >
      <ArrowForwardIosRoundedIcon />
    </Button>
  );
};

export const settings = {
  centerMode: false,
  dots: false,
  infinite: false,
  slidesToShow: 4.5,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: true,
  mobileFirst: true,
  prevArrow: <ArrowLeft />,
  nextArrow: <ArrowRight /> /*
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        centerMode: false,
        slidesToShow: 3.5,
        slidesToScroll: 1,
        initialSlide: 0,
      },
    },
    {
      breakpoint: 600,
      settings: {
        centerMode: false,
        slidesToShow: 2.5,
        slidesToScroll: 1,
        initialSlide: 0,
      },
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1,
        initialSlide: 0,
      },
    },
  ],*/,
};
