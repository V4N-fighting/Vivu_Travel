import styled from "styled-components";
import Banner from "../../Component/Banner";
import { Grid, GridCol_3, GridCol_9, GridRow, Title } from "../../styled";
import CollapseComponent from "./Collapse";
import { useState } from "react";

const destinations = ['Việt Nam', 'Lào', 'Thái Lan', 'USA', 'Australia', 'Ba Lan'];
const activities = ['Việt Nam', 'Lào', 'Thái Lan', 'USA', 'Australia', 'Ba Lan'];
const type = ['Vui', 'Buồn'];
const dangerous = ['Mạnh', 'Trung bình', 'Không mạo hiểm'];

function Trip() {

  const [minPrice, setMinPrice] = useState<string>("");
  const [maxPrice, setMaxPrice] = useState<string>("");

  const [minDay, setMinDay] = useState<string>("");
  const [maxDay, setMaxDay] = useState<string>("");

  const handleApply = () => {
    console.log(`Từ: ${minPrice}, Đến: ${maxPrice}`);
    // Thêm logic xử lý khi bấm nút ÁP DỤNG

    console.log(`Từ: ${minDay}, Đến: ${maxDay}`);
    // Thêm logic xử lý khi bấm nút ÁP DỤNG
  };


  return (
    <>
      <Banner
        background={"https://travel-spark.monamedia.net/wp-content/uploads/2023/10/breadcumb-bg.jpg"}
        pageName={"Lưu trữ: Trips"}
        thisPage={"/Tripss"}
      />
      <Container>
        <TitleTrip>Trips</TitleTrip>
        <Grid>
          <GridRow margin="10px">
            <GridCol_3>
              <Sidebar>
                <SidebarItem>
                  <Title small margin="0">Điều kiện lọc</Title>
                  <DeleteAll>Xóa tất cả</DeleteAll>
                </SidebarItem>
                <SidebarItem>
                  <CollapseComponent 
                    label="Điểm đến" 
                  >
                    {destinations.map((val, index) => {
                      return (<TypeItem key={index}> <input type="checkbox" /> <span>{val}</span></TypeItem>);
                    })}
                  </CollapseComponent>
                </SidebarItem>
                <SidebarItem>
                  <CollapseComponent label="Giá" >
                      <InputContainer>
                        <InputWrapper>
                          <Currency>đ</Currency>
                          <Input
                            value={minPrice}
                            onChange={(e) => setMinPrice(e.target.value)}
                            placeholder="Từ"
                          />
                        </InputWrapper>
                        <Separator>-</Separator>
                        <InputWrapper>
                          <Currency>đ</Currency>
                          <Input
                            value={maxPrice}
                            onChange={(e) => setMaxPrice(e.target.value)}
                            placeholder="Đến"
                          />
                        </InputWrapper>
                      </InputContainer>
                      <ApplyButton onClick={handleApply}>ÁP DỤNG</ApplyButton>
                  </CollapseComponent>
                </SidebarItem>
                <SidebarItem>
                  <CollapseComponent label="Thời gian" >
                      <InputContainer>
                        <InputWrapper>
                          <Currency>ngày</Currency>
                          <Input
                            value={minDay}
                            onChange={(e) => setMinDay(e.target.value)}
                            placeholder="Từ"
                          />
                        </InputWrapper>
                        <Separator>-</Separator>
                        <InputWrapper>
                          <Currency>ngày</Currency>
                          <Input
                            value={maxDay}
                            onChange={(e) => setMaxDay(e.target.value)}
                            placeholder="Đến"
                          />
                        </InputWrapper>
                      </InputContainer>
                      <ApplyButton onClick={handleApply}>ÁP DỤNG</ApplyButton>
                  </CollapseComponent>
                </SidebarItem>
                <SidebarItem>
                  <CollapseComponent label="Các hoạt động" >
                    <TypeItem> <input type="checkbox" /> <span>Tào lao</span></TypeItem>
                  </CollapseComponent>
                </SidebarItem>
                <SidebarItem>
                  <CollapseComponent label="Loại chuyến đi">
                    <TypeItem> <input type="checkbox" /> <span>Tào lao</span></TypeItem>
                  </CollapseComponent>
                </SidebarItem>
                <SidebarItem>
                  <CollapseComponent label="Độ mạo hiểm" >
                    <TypeItem> <input type="checkbox" /> <span>Tào lao</span></TypeItem>
                  </CollapseComponent>
                </SidebarItem>
              </Sidebar>
            </GridCol_3>
            <GridCol_9>
              <Content></Content>
            </GridCol_9>
          </GridRow>
        </Grid>
      </Container>
    </>
  );
}

const Container = styled.div`
  padding: 100px 0;
  max-width: 1250px;
  width: 100%;
  margin: 0 auto;
`;

const TitleTrip = styled.div`
  font-size: 40px;
  font-weight: 600;
  color: #000000;
  margin: 20px 0;
`

const Sidebar = styled.div`
  width: 100%;
  box-shadow: rgba(100, 100, 111, 0.2) 0px 7px 29px 0px;
  padding: 0 20px;
`
const Content = styled.div`
  height: 100px;
  width: 100%;
  background-color: blueviolet;
  padding: 0 20px;
`
const SidebarItem = styled.div`
  width: 100%;
  display: flex;
  align-items: center;
  justify-content: space-between;
  padding: 20px 0;
  border-bottom: 1px solid #d1d1d1;

`

const DeleteAll = styled.div`
  font-size: 14px;
  text-decoration: underline;
  color: #555555;
  cursor: pointer;
`

const TypeItem = styled.div`
    padding: 10px 0 10px 10px;

    & input {
        font-size: 14px;
    }

    & span {
        font-size: 14px;
        color: black;
        margin-left: 20px;
    }
`;

const InputContainer = styled.div`
  display: flex;
  align-items: center;
  justify-content: space-between;
  width: 100%;
`;

const InputWrapper = styled.div`
  position: relative;
  flex: 1;
`;

const Currency = styled.span`
  position: absolute;
  right: 10px;
  top: 50%;
  transform: translateY(-50%);
  font-size: 14px;
  color: #888;
`;

const Input = styled.input`
  width: 100%;
  padding: 8px 20px 8px 10px;
  border: 1px solid #ccc;
  border-radius: 5px;
  font-size: 12pxs;
  color: #333;

  &:focus {
    outline: none;
    border-color: #ff5722;
  }
`;

const Separator = styled.div`
  margin: 0 10px;
  font-size: 16px;
  color: #888;
`;

const ApplyButton = styled.button`
  background-color: #ff5722;
  width: 100%;
  color: #fff;
  padding: 10px 0;
  margin-top: 20px;
  font-size: 14px;
  font-weight: bold;
  text-transform: uppercase;
  border: none;
  border-radius: 5px;
  cursor: pointer;

  &:hover {
    background-color: #e64a19;
  }

  &:active {
    background-color: #d84315;
  }
`;

export default Trip;
