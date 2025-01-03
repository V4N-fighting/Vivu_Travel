import React, { useRef, useState } from "react";
import styled from "styled-components";
import Banner from "../../Component/Banner";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import { faUser } from "@fortawesome/free-regular-svg-icons";
import { faArrowRightFromBracket, faCamera, faGear, faLocation, faTicket } from "@fortawesome/free-solid-svg-icons";
import Button from "../../Component/button/Button";
import { countryList } from "../../Component/CountryList";

interface ProfileProps {
    user?: string;
}

const Profile: React.FC<ProfileProps> = ({ user = "ngocvan" }) => {
    const [activeTab, setActiveTab] = useState("Đặt Tour");
    const [changePassword, setChangePassword] = useState(false);

    const [avatar, setAvatar] = useState<string | null>('https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/avatar-cute-3.jpg'); // State để lưu ảnh
    const fileInputRef = useRef<HTMLInputElement>(null); // Tham chiếu đến input file
  
    // Hàm mở file explorer khi nhấn vào camera icon
    const handleIconClick = () => {
      fileInputRef.current?.click(); // Trigger input file
    };
  
    // Hàm cập nhật ảnh khi người dùng chọn file
    const handleFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
      const file = e.target.files?.[0];
      if (file) {
        const imageUrl = URL.createObjectURL(file); // Tạo URL cho file ảnh
        setAvatar(imageUrl); // Cập nhật state
      }
    };

    return (
        <>
            <Banner 
                background={"https://travel-spark.monamedia.net/wp-content/uploads/2023/10/breadcumb-bg.jpg"} 
                pageName={"Profile"} 
                thisPage={"/profile"}
            />
            <Contain>
                <Header>
                    <Left>
                        <Icon icon={faUser} />
                        <span>Xin chào {user}!</span>
                    </Left>
                    <Button orange>
                        <Icon icon={faArrowRightFromBracket} />
                        &nbsp; Đăng xuất
                    </Button>
                </Header>
                <Content>
                    <SideBar>
                        <SidebarItem active={activeTab === "Đặt Tour"} onClick={() => setActiveTab("Đặt Tour")}>
                            <Icon icon={faTicket} />
                            Đặt Tour
                        </SidebarItem>
                        <SidebarItem active={activeTab === "Địa chỉ"} onClick={() => setActiveTab("Địa chỉ")}>
                            <Icon icon={faLocation} />
                            Địa chỉ
                        </SidebarItem>
                        <SidebarItem active={activeTab === "Tài khoản"} onClick={() => setActiveTab("Tài khoản")}>
                            <Icon icon={faGear} />
                            Tài khoản
                        </SidebarItem>
                    </SideBar>
                    <MainContent>
                        {activeTab === "Tài khoản" ? (
                            <>
                                <Title>Tài khoản</Title>
                                <Text>Chỉnh sửa chi tiết tài khoản và mật khẩu của bạn bằng cách sử dụng mẫu dưới đây.</Text>
                                <AccountForm>
                                    <AvatarWrapper>
                                        {/* Avatar */}
                                            <AvatarImage src={avatar || "https://via.placeholder.com/150"} alt="Avatar" />

                                        {/* Icon Camera */}
                                        <CameraIconWrapper onClick={handleIconClick}>
                                            <Icon icon={faCamera} />
                                        </CameraIconWrapper>

                                        {/* Input File Ẩn */}
                                        <HiddenFileInput
                                            type="file"
                                            accept="image/*"
                                            ref={fileInputRef}
                                            onChange={handleFileChange}
                                        />
                                    </AvatarWrapper>
                                    <InputWrapper>
                                        <Label>First Name:*</Label>
                                        <Input type="text" placeholder="Nhập First Name" />
                                    </InputWrapper>
                                    <InputWrapper>
                                        <Label>Last Name:*</Label>
                                        <Input type="text" placeholder="Nhập Last Name" />
                                    </InputWrapper>
                                    <InputWrapper>
                                        <Label>Email:*</Label>
                                        <Input type="email" defaultValue="ngocvanluong14102004@gmail.com" />
                                    </InputWrapper>
                                    <InputWrapper>
                                        <Label>Thay đổi mật khẩu:</Label>
                                        <Switch>
                                            <input
                                                type="checkbox"
                                                id="togglePassword"
                                                checked={changePassword}
                                                onChange={() => setChangePassword(!changePassword)}
                                            />
                                            <span />
                                        </Switch>
                                    </InputWrapper>
                                    {
                                        changePassword && (
                                            <>
                                                <InputWrapper>
                                                    <Label>Mật khẩu cũ:*</Label>
                                                    <Input type="password" placeholder="Nhập mật khẩu cũ"/>
                                                </InputWrapper>
                                                <InputWrapper>
                                                    <Label>Mật khẩu mới:*</Label>
                                                    <Input type="password" placeholder="Mật khẩu phải trên 10 kí tự bao gồm số và chữ cái"/>
                                                </InputWrapper>
                                                <InputWrapper>
                                                    <Label>Xác nhận mật khẩu mới:*</Label>
                                                    <Input type="password" placeholder="Mật khẩu phải trên 10 kí tự bao gồm số và chữ cái"/>
                                                </InputWrapper>
                                            </>
                                        )
                                    }
                                    <Button orange>Lưu thay đổi</Button>
                                </AccountForm>
                            </>
                        ) : activeTab === "Địa chỉ" ? (
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
                                                <option key={index} value={country}>{country}</option>
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
                        ) : (
                            <>
                                <Title>Đặt Tour</Title>
                                <Text>Dưới đây là danh sách các đặt tour đã được thực hiện thành công.</Text>
                                <Text small>Bạn chưa thực hiện tour nào.</Text>
                            </>
                        )}
                    </MainContent>
                </Content>
            </Contain>
        </>
    );
};

// Styled Components
const Contain = styled.div`
    padding: 100px 0;
    max-width: 1220px;
    width: 100%;
    margin: 0 auto;
`;

const Header = styled.div`
    padding: 50px 20px;
    width: 100%;
    border-bottom: 1px solid #888888;
    display: flex;
    align-items: center;
    justify-content: space-between;
`;

const Left = styled.div`
    font-size: 30px;
    color: #333333;
    font-weight: 500;

    span {
        margin-left: 30px;
    }
`;

const Content = styled.div`
    display: grid;
    grid-template-columns: 30% 70%;
    padding: 50px 0;
    width: calc(100% + 50px);
    margin: 0 -25px;
`;

const SideBar = styled.div`
    padding: 0 25px;
    background-color: aliceblue;
    border-radius: 10px;
    margin: 0 25px;
    max-height: fit-content;
`;

const SidebarItem = styled.div<{ active?: boolean }>`
    display: flex;
    align-items: center;
    margin: 10px 0;
    padding: 10px 0;
    color: ${(props) => (props.active ? "#ff6a00" : "#5f6368")};
    font-size: 18px;
    font-weight: ${(props) => (props.active ? "bold" : "normal")};
    cursor: pointer;

    &:hover {
        color: #ff6a00;
    }
`;

const MainContent = styled.div`
    padding: 25px;
    margin: 0 25px;
    background-color: aliceblue;
    border-radius: 10px;
    min-height: 100%;
`;

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

const Icon = styled(FontAwesomeIcon)`
    font-size: inherit;
    color: inherit;
    margin: 0 10px 0 10px;
`;

const AccountForm = styled.div`
    display: flex;
    flex-direction: column;
    gap: 20px;
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

const Switch = styled.label`
    display: flex;
    align-items: center;

    input {
        position: relative;
        width: 40px;
        height: 20px;
        appearance: none;
        background-color: #ddd;
        border-radius: 20px;
        outline: none;
        transition: background 0.3s;

        &:checked {
            background-color: #ff6a00;
        }

        &::before {
            content: "";
            position: absolute;
            width: 16px;
            height: 16px;
            background: white;
            border-radius: 50%;
            top: 50%;
            left: 2px;
            transform: translateY(-50%);
            transition: 0.3s;
        }

        &:checked::before {
            left: 22px;
        }
    }
`;

const AvatarWrapper = styled.div`
  position: relative;
  display: inline-block;
  width: 150px;
  height: 150px;
`;

const AvatarImage = styled.img`
  width: 100%;
  height: 100%;
  object-fit: cover;
  border-radius: 50%;
  border: 2px solid #ddd;
`;

const CameraIconWrapper = styled.div`
  position: absolute;
  bottom: 10px;
  right: 10px;
  width: 35px;
  height: 35px;
  display: flex;
  justify-content: center;
  align-items: center;
  background-color: #ff6a00;
  color: #fff;
  border-radius: 50%;
  cursor: pointer;
  box-shadow: 0px 2px 5px rgba(0, 0, 0, 0.3);

  &:hover {
    background-color: #e65900;
  }
`;

const HiddenFileInput = styled.input`
  display: none;
`;

export default Profile;

