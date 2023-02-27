import { StyledCard } from "./styles";

type CardProps = {
    color: string;
    name?: string;
}

export const Card: React.FC<CardProps> = ({ name = 'Ezechiele', color }) => {
    return (
        <StyledCard color={color}>
            Ciao, io sono {name}
        </StyledCard>
    )
}