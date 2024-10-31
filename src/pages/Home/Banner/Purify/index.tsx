import styled, { keyframes } from "styled-components";
import {ArrowRightOutlined, CarOutlined, FieldTimeOutlined, MoneyCollectOutlined} from '@ant-design/icons';
import PurifyItem from "./PurifyItem";
import Button from "../../../../Component/button/Button";
import { EnvironmentOutlined } from '@ant-design/icons';


interface PurifyProps {
}

const PurifyContent = [
  {
    width: '20%',
    Icon: EnvironmentOutlined,
    placeholder: 'Điểm đến',
    options: [
      {value: 1, label: 'Đảo trên trời'},
      {value: 2, label: 'Hoa quả sơn'},
      {value: 3, label: 'Tây thiên'},
      {value: 4, label: 'Sư đà lĩnh'},
      {value: 5, label: 'Thủy liêm động'},
      {value: 6, label: 'Cao lão trang'},
    ]
  },
  {
    width: '20%',
    Icon: CarOutlined,
    placeholder: 'Hoạt động',
    options: [
      {value: 1, label: 'Tham quan'},
      {value: 2, label: 'Ăn uống'},
      {value: 3, label: 'Tham gia lễ hội'},
      {value: 4, label: 'Thử thách sinh tồn'},
      {value: 5, label: 'Bơi lội'},
      {value: 6, label: 'Đua xe'},
    ]
  },
  {
    width: '20%',
    Icon: FieldTimeOutlined ,
    placeholder: 'Thời gian',
    options: [
      {value: 1, label: '1 - 10 ngày'},
      {value: 2, label: '11 - 20 ngày'},
      {value: 3, label: '1 tháng'},
      {value: 4, label: 'Hơn 1 tháng'},
    ]
  },
  {
    width: '20%',
    Icon: MoneyCollectOutlined,
    placeholder: 'Mức giá', 
    options: [
      {value: 1, label: '0 - 1 triệu đồng'},
      {value: 2, label: '1 - 2 triệu đồng'},
      {value: 3, label: '2 - 10 triệu đồng'},
      {value: 4, label: '10 - 100 triệu đồng'},
      {value: 5, label: 'Hơn 100 triệu đồng'},
    ]
  },
]




const Purify: React.FC<PurifyProps> = ({}) => {
  return (
    <Wrapper>
        {PurifyContent.map((val, index) => {
          return <PurifyItem key={index} width={val.width} Icon={val.Icon} placeholder={val.placeholder} optionsValue={val.options}></PurifyItem>
        })}
        <Button orange>Tìm ngay</Button>
    </Wrapper>
  );
};

const Wrapper = styled.div`
    display: flex;
    align-items: center;
    justify-content: space-around;
    padding: 40px 20px;
    border-radius: 15px;
    width: 1250px;
    max-width: 100%;
    margin: 0 auto;
    position: absolute;
    bottom: 0;
    left: 50%;
    transform: translate(-50%, 50%);
    background-color: white;
    z-index: 10;
    box-shadow: rgba(149, 157, 165, 0.2) 0px 8px 24px;
`



export default Purify;
