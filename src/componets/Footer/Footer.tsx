import { StyledFooter } from "./styles";
import logo from "../../utils/img/logo.jpeg";
export const Footer: React.FC = () => {
  return (
    <StyledFooter>
      <img src={logo} />
    </StyledFooter>
  );
};
