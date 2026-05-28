
import styled from "styled-components";
import Button from "../../../Component/BaseComponent/Button/Button";
import { Text } from "../../../styled";
import { InfoDetail } from "./InfoDetail";
import { faCar, faHotel, faLanguage, faMountainSun, IconDefinition } from "@fortawesome/free-solid-svg-icons";
import Icons from "../../../Component/BaseComponent/Icons";
import { ReactNode } from "react";




interface SidebarProps {
    handleScrollToForm: () => void,
    showModel: () => void,
    data: any
}

const Sidebar: React.FC<SidebarProps> = ({handleScrollToForm, showModel, data}) => {
    const infodetail: {id: number, item: string, value: string, icon: ReactNode}[] = [
        {
            id: 1,
            item: 'Accomodation',
            value: data && data.hotelStar  + ' Stars Hotels',
            icon: <Icons.HotelIcon />,
        },
        {
            id: 2,
            item: 'Transportation',
            value: data && Array.isArray(data.transportation) ? data.transportation.join(', ') : '',
            icon: <Icons.CarIcon />,
        },
        {
            id: 3,
            item: 'Maximum Altitude',
            value: data && data.altitude,
            icon: <Icons.MountainSunIcon />,
        },
        {
            id: 4,
            item: 'Language',
            value: data && data.language ? (Array.isArray(data.language) ? data.language.join(', ') : data.language) : '',
            icon: <Icons.LanguageIcon />,
        },
    ]

    const priceDisplay = data && data.price?.adult && data.price.adult !== "0"
        ? new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(Number(data.price.adult))
        : 'Đang cập nhật';

    return ( 
        <Wrapper>
            <PriceBox>
                <Top>
                    <Text small style={{textAlign: 'center'}}>Từ</Text>
                    <Text small style={{textAlign: 'center'}}><Cost>{priceDisplay}</Cost>/Adult</Text>
                </Top>
                <Bottom>
                    <Button 
                        orange={data?.is_active !== false} 
                        style={{
                            width: '100%', 
                            borderRadius: '0', 
                            backgroundColor: data?.is_active === false ? '#d9d9d9' : undefined,
                            cursor: data?.is_active === false ? 'not-allowed' : 'pointer'
                        }} 
                        onClick={() => data?.is_active !== false && showModel()}
                        disabled={data?.is_active === false}
                    >
                        {data?.is_active === false ? 'Ngừng kinh doanh' : 'Kiểm tra'}
                    </Button>
                    <Text small style={{textAlign: 'center'}}>
                        Cần trợ giúp về việc đặt chổ? 
                        <span 
                            style={{color: 'red', cursor: 'pointer', textDecoration: 'underline'}} 
                            onClick={handleScrollToForm}>&nbsp;Gửi tin nhắn cho chúng tôi
                        </span>
                    </Text>
                </Bottom>
            </PriceBox>
            <Information>
                {infodetail.map((item, index) => {
                    return (
                        <InfoDetail key={index} item={item.item} value={item.value} icon={item.icon} />
                    )
                })}
            </Information>
        </Wrapper>
     );
}


const Wrapper = styled.div`
    width: 100%;
    padding: 0 20px;
`

const PriceBox = styled.div`
    width: 100%;
    padding-bottom: 100%;
    background-color: white;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;
    position: relative;
`

const Top = styled.div`
    position: absolute;
    top: 0%;
    left: 0;
    bottom: 50%;
    width: 100%;
    padding: 10px 20px;
    text-align: center;
    display: flex;
    align-items: center;
    justify-content: center;
    flex-direction: column;

`
const Bottom = styled.div`
    position: absolute;
    top: 50%;
    left: 0;
    width: 100%;
    padding: 10px 20px;
    text-align: center;
`

const Cost = styled.span`
    font-size: 36px;
    font-weight: 700;
    color: red;
`

const Information = styled.div`
    width: 100%;
    margin-top: 20px;
    padding: 10px 20px;
    background-color: white;
    box-shadow: rgba(17, 12, 46, 0.15) 0px 48px 100px 0px;

`

export default Sidebar;