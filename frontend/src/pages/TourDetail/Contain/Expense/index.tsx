import styled from "styled-components"
import {Icon, Text, Title } from "../../../../styled"
import Icons from "../../../../Component/BaseComponent/Icons"

interface ExpenseProps {
    data: any
}

export const Expense:React.FC<ExpenseProps> = ({data}) => {
    // Ưu tiên lấy trực tiếp từ data, nếu không có mới lấy từ data.price
    const priceAdult = data?.price_adult || data?.price?.adult || 0;
    const priceChild = data?.price_child || data?.price?.child || 0;

    const formatPrice = (price: number | string) => {
        const num = Number(price);
        return isNaN(num) ? "0 ₫" : new Intl.NumberFormat('vi-VN', { style: 'currency', currency: 'VND' }).format(num);
    };

    return (
        <Wrap>
            <Title small>Chi phí tour</Title>
            <Include>
                <Text small bold >Giá vé người lớn</Text>
                <Text small style={{ marginTop: '10px' }}>
                    <Icons.CircleCheckIcon color="green"/>
                    Giá cơ bản: <span style={{ color: '#FF681A', fontWeight: 'bold' }}>{formatPrice(priceAdult)}</span> / người
                </Text>
                <Text small style={{ marginTop: '5px', color: '#666' }}>
                    • Bao gồm xe đưa đón sân bay, khách sạn, ăn uống theo chương trình.
                </Text>
            </Include>
            <Exclude>
                <Text small bold >Giá vé trẻ em</Text>
                <Text small style={{ marginTop: '10px' }}>
                    <Icons.CircleCheckIcon color="green"/>
                    Giá cơ bản: <span style={{ color: '#FF681A', fontWeight: 'bold' }}>{formatPrice(priceChild)}</span> / trẻ em
                </Text>
                <Text small style={{ marginTop: '5px', color: '#666' }}>
                    • Áp dụng cho trẻ em từ 2 đến dưới 12 tuổi.
                </Text>
            </Exclude>
        </Wrap>
    )
}

const Wrap = styled.div`
    width: 100%;
    padding: 10px 0;
    margin: 10px 0;
`

const Include = styled.div`
    padding: 10px 0;
`

const Exclude = styled.div`
    padding: 10px 0;
    
`