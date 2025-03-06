
import { faArrowUp } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../../../styled";

export const ArrowUpIcon = ({ ...props }: Partial<React.ComponentProps<typeof Icon>>) => {
    return <Icon {...props} icon={faArrowUp}  />;
};
