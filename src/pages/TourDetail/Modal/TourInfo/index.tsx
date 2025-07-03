
import styled from "styled-components";
import Button from "../../../../Component/BaseComponent/Button/Button";
import CloseButton from "../../../../Component/BaseComponent/Button/CloseButton";
import { RowBetween, Text } from "../../../../styled";


interface TourInfoProps {
    title: string,
    total: number,
    hideModal: () => void,
    day: number,
    month: number,
    year: number
}

const TourInfo: React.FC<TourInfoProps> = ({ title, total, hideModal, day, month, year}) => {
   

    return (
        <>
            <RowBetween>
                <Text small style={{ textTransform: 'uppercase' }}>Thông tin đặt tour</Text>
                <CloseButton white onClick={hideModal} />
            </RowBetween>
            <Text bold style={{ width: '70%', textAlign: 'left' }}>{title}</Text>
            <Text small  style={{ textAlign: 'left' }}>
                <span style={{ fontWeight: 'bold' }}>Starting Date:&nbsp;</span>{day}&nbsp;tháng&nbsp;{month}&nbsp;{year}
            </Text>
            <Button blue style={{ borderRadius: 0, pointerEvents: 'none' }}>Package: Cơ bản</Button>
            <Role>Du khách</Role>
            <Total>Total: {total} VND</Total>
            <Total>({total / 1000000} triệu đồng) </Total>

        </>
    );
};

const Role = styled.div`
    font-size: 14px;
    color: #666666;
    text-transform: capitalize;
    padding: 20px 0;
    border-top: 1px solid #666666;
    border-bottom: 1px solid #666666;
`;

const Total = styled.div`
    text-align: right;
    font-size: 24px;
    font-weight: bold;
    padding: 20px;
`;

export default TourInfo;
