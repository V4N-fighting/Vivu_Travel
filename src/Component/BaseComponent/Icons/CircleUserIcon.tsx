
import { faCircleUser } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../../../styled";

export const CircleUserIcon = ({ ...props }: Partial<React.ComponentProps<typeof Icon>>) => {
    return <Icon {...props} icon={faCircleUser}  />;
};
