import { Button } from "@mui/material";
import { styled } from "@mui/material/styles";
import Typography from "@mui/material/Typography";
import ArrowBackIosRoundedIcon from "@mui/icons-material/ArrowBackIosRounded";
import ArrowForwardIosRoundedIcon from "@mui/icons-material/ArrowForwardIosRounded";

export const StyledCarusel = styled("div")`
  //position: relative;
`;

export const Text = styled(Typography)`
  color: white;
  text-decoration: none;
  padding-bottom: 1%;
`;
export const StyledSlide = styled("div")`
  //margin-right: 10px;
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
export const settings1 = {
  className: "center",
  centerMode: true,
  dots: true,
  infinite: true,
  centerPadding: "200px",
  speed: 500,
  slidesToShow: 1,
  slidesToScroll: 1,
  adaptiveHeight: true,
  prevArrow: <ArrowLeft />,
  nextArrow: <ArrowRight />,
};

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
        initialSlide: 0,
      },
    },
    {
      breakpoint: 600,
      settings: {
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
