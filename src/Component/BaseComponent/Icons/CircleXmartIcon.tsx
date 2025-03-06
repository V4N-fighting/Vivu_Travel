
import { faCircleXmark } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../../../styled";

export const CircleXmartIcon = ({ ...props }: Partial<React.ComponentProps<typeof Icon>>) => {
    return <Icon {...props} icon={faCircleXmark}  />;
};
