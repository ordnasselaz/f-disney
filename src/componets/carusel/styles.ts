import { styled } from '@mui/material/styles';

export const StyledCarusel = styled('div')`
margin: 10%;
`
export const settings = {
  dots: false,
  infinite: false,
  slidesToShow: 4.5,
  slidesToScroll: 1,
  initialSlide: 0,
  arrows: true,
  responsive: [
    {
      breakpoint: 1024,
      settings: {
        slidesToShow: 3.5,
        slidesToScroll: 1,
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