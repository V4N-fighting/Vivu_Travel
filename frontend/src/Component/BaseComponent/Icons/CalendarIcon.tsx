import { faCalendarDays } from "@fortawesome/free-solid-svg-icons";
import { Icon } from "../../../styled";

export const CalendarIcon = ({...props }: Partial<React.ComponentProps<typeof Icon>>) => {
    return <Icon {...props} icon={faCalendarDays} />
}