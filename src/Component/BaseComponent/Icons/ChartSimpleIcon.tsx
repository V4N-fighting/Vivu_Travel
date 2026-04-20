import { faChartSimple } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../../../styled";

export const ChartSimpleIcon = ({ ...props }: Partial<React.ComponentProps<typeof Icon>>) => {
    return <Icon {...props} icon={faChartSimple} />
}