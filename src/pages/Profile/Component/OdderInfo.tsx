import styled from "styled-components";

const OrderInfo = () => {
  return (
    <>
      <Title>Đặt Tour</Title>
      <Text>
        Dưới đây là danh sách các đặt tour đã được thực hiện thành công.
      </Text>
      <Text small>Bạn chưa thực hiện tour nào.</Text>
    </>
  );
};

const Title = styled.div`
  font-size: 24px;
  font-weight: 600;
  color: #222222;
  line-height: 1;
  margin-bottom: 20px;
`;

const Text = styled.div<{ small?: boolean }>`
  font-size: ${(props) => (props.small ? "16px" : "20px")};
  color: #555555;
  line-height: 1;
  margin-bottom: 16px;
`;


export default OrderInfo;
