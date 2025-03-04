import styled from "styled-components";
import { useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../Component/BaseComponent/Button/Button";
import { faCamera } from "@fortawesome/free-solid-svg-icons";
import { Title } from "../../../styled";

const AccountInfo = () => {
  const [isChangePassword, setIsChangePassword] = useState(false);

  const [avatar, setAvatar] = useState<string | null>(
    "https://cdn11.dienmaycholon.vn/filewebdmclnew/public/userupload/files/Image%20FP_2024/avatar-cute-3.jpg"
  ); // State để lưu ảnh
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
      <Title medium>Tài khoản</Title>
      <Text>
        Chỉnh sửa chi tiết tài khoản và mật khẩu của bạn bằng cách sử dụng mẫu
        dưới đây.
      </Text>
      <AccountForm>
        <AvatarWrapper>
          {/* Avatar */}
          <AvatarImage
            src={avatar || "https://via.placeholder.com/150"}
            alt="Avatar"
          />

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
              checked={isChangePassword}
              onChange={() => setIsChangePassword(!isChangePassword)}
            />
            <span />
          </Switch>
        </InputWrapper>
        {isChangePassword && (
          <>
            <InputWrapper>
              <Label>Mật khẩu cũ:*</Label>
              <Input type="password" placeholder="Nhập mật khẩu cũ" />
            </InputWrapper>
            <InputWrapper>
              <Label>Mật khẩu mới:*</Label>
              <Input
                type="password"
                placeholder="Mật khẩu phải trên 10 kí tự bao gồm số và chữ cái"
              />
            </InputWrapper>
            <InputWrapper>
              <Label>Xác nhận mật khẩu mới:*</Label>
              <Input
                type="password"
                placeholder="Mật khẩu phải trên 10 kí tự bao gồm số và chữ cái"
              />
            </InputWrapper>
          </>
        )}
        <Button orange>Lưu thay đổi</Button>
      </AccountForm>
    </>
  );
};




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
export default AccountInfo;
