import { styled } from '@mui/material/styles';
import { Card } from "@mui/material";

export const StyledCard = styled(Card)`
    background-color: ${props => props.color};
    width: 50%;
    height: 50px;
    &:hover {
        width: 55%;
        height: 70px;
    }
`