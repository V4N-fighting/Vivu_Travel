
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../../../styled";

export const CameraIcon = ({ ...props }: Partial<React.ComponentProps<typeof Icon>>) => {
    return <Icon {...props} icon={faCamera}  />;
};
