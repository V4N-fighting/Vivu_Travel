
import { faCirclePlay } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../../../styled";

export const CirclePlayIcon = ({ ...props }: Partial<React.ComponentProps<typeof Icon>>) => {
    return <Icon {...props} icon={faCirclePlay}  />;
};
