import { styled } from '@mui/material/styles';

export const StyledCarusel = styled('div')`
margin: 10%;
`
export const settings = {
  dots: true,
  infinite: false,
  speed: 500,
  slidesToShow: 4.5,
  slidesToScroll: 1,
  initialSlide: 0,
  arrow: false,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3.5,
        slidesToScroll: 1,
        infinite: true,
        dots: true
      }
    },
    {
      breakpoint: 600,
      settings: {
        slidesToShow: 2.5,
        slidesToScroll: 1,
        initialSlide: 2
      }
    },
    {
      breakpoint: 480,
      settings: {
        slidesToShow: 1,
        slidesToScroll: 1
      }
    }
  ]
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