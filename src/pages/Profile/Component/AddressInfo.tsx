
import styled from "styled-components";
import Button from "../../../Component/BaseComponent/Button/Button";

type AddressInfoProps = {
  countryList: string[];
};

const AddressInfo = ({ countryList }: AddressInfoProps) => {
  return (
    <>
      <Title>Địa chỉ thanh toán</Title>
      <Text>Chỉnh sửa chi tiết địa chỉ thanh toán của bạn.</Text>
      <Form>
        <InputWrapper>
          <Label>Địa chỉ:</Label>
          <Input type="text" placeholder="Nhập địa chỉ của bạn" />
        </InputWrapper>
        <InputWrapper>
          <Label>Zip/Postal Code:</Label>
          <Input type="text" placeholder="Nhập zip/postal code" />
        </InputWrapper>
        <InputWrapper>
          <Label>Quốc gia:</Label>
          <Input as="select">
            <option>Chọn 1 quốc gia</option>
            {countryList.map((country, index) => (
              <option key={index} value={country}>
                {country}
              </option>
            ))}
          </Input>
        </InputWrapper>
        <InputWrapper>
          <Label>Số điện thoại:</Label>
          <Input type="text" placeholder="Nhập số điện thoại" />
        </InputWrapper>
        <Button orange>Lưu thay đổi</Button>
      </Form>
    </>
  );
};



const Form = styled.div`
  display: flex;
  flex-direction: column;
  gap: 20px;
`;

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

const InputWrapper = styled.div`
  display: flex;
  flex-direction: column;
`;

const Label = styled.label`
  font-size: 18px;
  color: #333333;
  margin-bottom: 5px;
`;

const Input = styled.input`
  padding: 10px;
  border: 1px solid #cccccc;
  border-radius: 5px;
  font-size: 16px;

  &:focus {
    outline: none;
    border-color: #ff6a00;
  }
`;


export default AddressInfo;
