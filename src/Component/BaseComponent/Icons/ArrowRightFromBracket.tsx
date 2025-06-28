
import { faArrowRightFromBracket } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../../../styled";

export const ArrowRightFromBracket = ({ ...props }: Partial<React.ComponentProps<typeof Icon>>) => {
    return <Icon {...props} icon={faArrowRightFromBracket}  />;
};
