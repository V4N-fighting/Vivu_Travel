import styled from "styled-components";
import { useEffect, useRef, useState } from "react";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Button from "../../../Component/BaseComponent/Button/Button";
import { Title } from "../../../styled";
import Icons from "../../../Component/BaseComponent/Icons";
import { User } from "../../../service/authService";
import { updateUser } from "../../../service/userService";


const AccountInfo = ({user} : {user: User | null}) => {
  const [isChangePassword, setIsChangePassword] = useState(false);

  const [avatar, setAvatar] = useState<string | undefined>(user?.avatar); 

  const [userInfo, setUserInfo] = useState<User>
  ({
      id: user?.id,
      firstName: user?.firstName,
      lastName: user?.lastName,
      email: user?.email,
      password: user?.password,
  })

  const fileInputRef = useRef<HTMLInputElement>(null); 

  useEffect(() => {
    if (user) {
      setUserInfo({
        id: user.id,
        firstName: user.firstName,
        lastName: user.lastName,
        email: user.email,
        password: user.password,
      });
      setAvatar(user.avatar);
    }
  }, [user]);



  // open file explorer
  const handleIconClick = () => {
    fileInputRef.current?.click(); 
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleFileChange = async (e: React.ChangeEvent<HTMLInputElement>) => {
  const file = e.target.files?.[0];
  if (file) {
    const base64Image = await convertToBase64(file);
    setAvatar(base64Image); 
    localStorage.setItem("avatar", base64Image);
  }
};


  const handleSaveChange = () => {
    const updatedUser = { ...userInfo, avatar };
    updateUser(updatedUser)
  }

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

          <CameraIconWrapper onClick={handleIconClick}>
            <Icons.CameraIcon />
          </CameraIconWrapper>

          {/* Input hide File */}
          <HiddenFileInput
            type="file"
            accept="image/*"
            ref={fileInputRef}
            onChange={handleFileChange}
          />
        </AvatarWrapper>
        <InputWrapper>
          <Label>First Name:*</Label>
          <Input 
            type="text" 
            placeholder="Nhập First Name" 
            value={userInfo.firstName}
            onChange={(e) =>
              setUserInfo((prev) => ({
                ...prev,
                firstName: e.target.value,
              }))
            }
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Last Name:*</Label>
          <Input 
            type="text" 
            placeholder="Nhập Last Name" 
            value={userInfo.lastName}
            onChange={(e) =>
              setUserInfo((prev) => ({
                ...prev,
                lastName: e.target.value,
              }))
            }
          />
        </InputWrapper>
        <InputWrapper>
          <Label>Email:*</Label>
          <Input 
            type="email"  
            value={userInfo.email}
            onChange={(e) =>
              setUserInfo((prev) => ({
                ...prev,
                email: e.target.value,
              }))
            }
          />
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
              <Input type="password" value={userInfo.password} placeholder="Nhập mật khẩu cũ" />
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
        <Button orange onClick={handleSaveChange}>Lưu thay đổi</Button>
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
