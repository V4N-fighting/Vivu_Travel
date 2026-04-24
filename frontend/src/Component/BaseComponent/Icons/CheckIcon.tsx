import { faCheck } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../../../styled";

export const CheckIcon = ({ ...props }: Partial<React.ComponentProps<typeof Icon>>) => {
    return <Icon {...props} icon={faCheck} />
}