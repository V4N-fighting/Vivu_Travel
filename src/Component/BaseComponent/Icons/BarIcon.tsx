
import { faBars } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../../../styled";

export const BarIcon = ({ ...props }: Partial<React.ComponentProps<typeof Icon>>) => {
    return <Icon {...props} icon={faBars}  />;
};
