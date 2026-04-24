
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
    year: number,
    itineraries?: any[],
    meetingPoint?: string,
    transportations?: any[]
}

const TourInfo: React.FC<TourInfoProps> = ({ 
    title, total, hideModal, day, month, year,
    itineraries = [], meetingPoint, transportations = []
}) => {
   

    return (
        <InfoContainer>
            <RowBetween>
                <Text small style={{ textTransform: 'uppercase' }}>Thông tin đặt tour</Text>
                <CloseButton white onClick={hideModal} />
            </RowBetween>
            <Text bold style={{ width: '100%', textAlign: 'left', fontSize: '18px', marginBottom: '10px' }}>{title}</Text>
            
            <Section>
                <SectionTitle>Lịch khởi hành</SectionTitle>
                <Text small style={{ textAlign: 'left' }}>
                    <span style={{ fontWeight: 'bold' }}>Ngày đi: </span>{day} tháng {month} {year}
                </Text>
                {meetingPoint && (
                    <Text small style={{ textAlign: 'left', marginTop: '5px' }}>
                        <span style={{ fontWeight: 'bold' }}>Điểm hẹn: </span>{meetingPoint}
                    </Text>
                )}
            </Section>

            {itineraries.length > 0 && (
                <Section>
                    <SectionTitle>Hành trình</SectionTitle>
                    <ItineraryList>
                        {itineraries.map((item, index) => (
                            <ItineraryItem key={item.id}>
                                <DayBadge>N{item.day_number}</DayBadge>
                                <div style={{flex: 1}}>
                                    <div style={{fontWeight: 'bold', fontSize: '13px'}}>{item.title}</div>
                                </div>
                                {index < itineraries.length - 1 && <Connector />}
                            </ItineraryItem>
                        ))}
                    </ItineraryList>
                </Section>
            )}

            {transportations.length > 0 && (
                <Section>
                    <SectionTitle>Phương tiện</SectionTitle>
                    <div style={{display: 'flex', gap: '10px', flexWrap: 'wrap'}}>
                        {transportations.map((t: any) => (
                            <Tag key={t.id} color="blue">{t.transportation}</Tag>
                        ))}
                    </div>
                </Section>
            )}

            <div style={{marginTop: 'auto'}}>
                <Button blue style={{ borderRadius: 0, pointerEvents: 'none', width: '100%', marginBottom: '15px' }}>Package: Cơ bản</Button>
                <Role>Du khách</Role>
                <Total>Total: {new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(total)}</Total>
            </div>
        </InfoContainer>
    );
};

const InfoContainer = styled.div`
    display: flex;
    flex-direction: column;
    height: 100%;
    padding: 0 10px;
`;

const Section = styled.div`
    margin-bottom: 20px;
    padding-bottom: 15px;
    border-bottom: 1px dashed #eee;
`;

const SectionTitle = styled.div`
    font-weight: bold;
    font-size: 12px;
    color: #ff681a;
    text-transform: uppercase;
    margin-bottom: 8px;
`;

const ItineraryList = styled.div`
    display: flex;
    flex-direction: column;
    gap: 15px;
    padding-left: 5px;
`;

const ItineraryItem = styled.div`
    display: flex;
    align-items: center;
    gap: 10px;
    position: relative;
`;

const DayBadge = styled.div`
    background: #333;
    color: white;
    width: 24px;
    height: 24px;
    border-radius: 50%;
    display: flex;
    align-items: center;
    justify-content: center;
    font-size: 10px;
    font-weight: bold;
    z-index: 2;
`;

const Connector = styled.div`
    position: absolute;
    left: 11px;
    top: 24px;
    width: 2px;
    height: 15px;
    background: #ddd;
    z-index: 1;
`;

const Tag = styled.span`
    padding: 2px 8px;
    background: #e6f7ff;
    border: 1px solid #91d5ff;
    color: #1890ff;
    border-radius: 4px;
    font-size: 12px;
`;

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
