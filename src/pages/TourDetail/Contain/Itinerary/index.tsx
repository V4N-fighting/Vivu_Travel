import styled from "styled-components"
import { RowBetween, Icon, Text, Title } from "../../../../styled"
import { faPlus, faMinus } from "@fortawesome/free-solid-svg-icons";
import { useState, useEffect } from "react";
import Button from "../../../../Component/BaseComponent/Button/Button";
import Icons from "../../../../Component/BaseComponent/Icons";
import { ItineraryActivity } from "../../../../types/tour";

const setPlan: {id: number, plan: string, detail: string}[] = [
    {
        id: 1,
        plan: 'Đi Sài Gòn',
        detail: 'Ngồi nhìn kẹt xe chơi'
    },
    {
        id: 2,
        plan: 'Đi qua quận 12',
        detail: 'Tới thăm Văn đẹp trai'
    },
    {
        id: 3,
        plan: 'Đi tới quán net',
        detail: 'Mở doraemon xem '
    },
    {
        id: 4,
        plan: 'Đi qua quận 4',
        detail: 'Ra công viên ngồi cho gió thổi bớt cái sự dô diên'
    },
]

interface ItineraryProps {
    content: ItineraryActivity[],
}

interface ItemProps {
    plan: string;
    detail: string;
    index: number;
    showAll: boolean; 
}

const Item: React.FC<ItemProps> = ({ plan, detail, showAll, index }) => {
    const [showDetail, setShowDetail] = useState<boolean>(false);

    
    useEffect(() => {
        setShowDetail(showAll);
    }, [showAll]);

    return (
        <ItemWrapper>
            <Icons.PointIcon 
                style={{position: 'absolute', left: '-40px', top: '50%', transform: 'translateY(-50%)'}}
                fontSize='10px'
                color="red"
            />
            <Plan onClick={() => setShowDetail(!showDetail)}>
                <Text small bold  color="red">
                    <span style={{color: 'black'}}>Ngày {index + 1}: &nbsp;</span>
                    {plan}
                </Text>
                {showDetail ? <Icons.MinusIcon orange hover/> : <Icons.PlusIcon orange hover/>}
            </Plan>
            {showDetail && (
                <Detail>
                    <Text small>{detail}</Text>
                </Detail>
            )}
        </ItemWrapper>
    );
};

export const Itinerary:React.FC<ItineraryProps> = ({content}) => {
    console.log('content', content);
    const [showAll, setShowAll] = useState<boolean>(false);

    const handleShowAll = () => {
        setShowAll(!showAll); 
    };

    return (
        <Wrap>
            <RowBetween>
                <Title small>Itinerary</Title>
                <Button white onClick={handleShowAll}>
                    {showAll ? "Đóng tất cả" : "Mở tất cả"}
                </Button>
            </RowBetween>
            {content.map((item,index) => {
                return (
                    <Item key={index} plan={item.title} detail={item.activities.join(' ')} showAll={showAll} index={index}/>
                )
            })}
        </Wrap>
    )
}

const Wrap = styled.div`
    width: 100%;
    padding: 10px 0;
    margin: 10px 0;
`

const ItemWrapper = styled.div`
    width: 100%;
    border-top: 1px solid #444444;
    position: relative;
    /* border-bottom: 1px solid #444444; */

    &::before {
        content: '';
        width: 1px;
        height: 100%;
        background-color: red;
        position: absolute;
        top: 0;
        left: -26px;
    }
`

const Plan = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-between;
    padding: 10px 0;
    cursor: pointer;
`
const Detail = styled.div`
    
`