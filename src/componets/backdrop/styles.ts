import { styled } from '@mui/material/styles';

export const StyledBackdrop = styled('div')`
    &:hover {
    //width: 105%;
    border-radius: 4px;
    border: 4px solid rgba(255, 255, 255, 0);
    transition: border 300ms ease-out 0s;
    }
`