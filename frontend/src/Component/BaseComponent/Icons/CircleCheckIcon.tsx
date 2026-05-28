
import { faCircleCheck } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../../../styled";

export const CircleCheckIcon = ({ ...props }: Partial<React.ComponentProps<typeof Icon>>) => {
    return <Icon {...props} icon={faCircleCheck}  />;
};
