import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import { useDispatch } from "react-redux";
import Icons from "../../Component/BaseComponent/Icons";
import GoogleAuthButton from "../../Component/GoogleAuthButton";
import { loginWithGoogle, register } from "../../service/authService";
import { AppDispatch } from "../../app/store";
import { setUser } from "../../features/user/userSlice";
import config from "../../config";

interface RegisterForm {
  firstName: string;
  lastName: string;
  email: string;
  password: string;
  rememberMe: boolean;
  avatar: File | null;
}

const Register: React.FC = () => {
  const [form, setForm] = useState<RegisterForm>({
    firstName: "",
    lastName: "",
    email: "",
    password: "",
    rememberMe: false,
    avatar: null,
  });

  const navigate = useNavigate();
  const dispatch = useDispatch<AppDispatch>();

  const handleChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const { name, value, type, checked } = e.target;
    setForm((prev) => ({
      ...prev,
      [name]: type === "checkbox" ? checked : value,
    }));
  };

  const convertToBase64 = (file: File): Promise<string> => {
    return new Promise((resolve, reject) => {
      const reader = new FileReader();
      reader.readAsDataURL(file);

      reader.onload = () => resolve(reader.result as string);
      reader.onerror = (error) => reject(error);
    });
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();

    try {
      let avatarBase64 = "";
      if (form.avatar) {
        avatarBase64 = await convertToBase64(form.avatar);
      }

      await register({
        firstName: form.firstName,
        lastName: form.lastName,
        email: form.email,
        password: form.password,
        avatar: avatarBase64,
      });

      alert("Dang ky thanh cong!");
      navigate(config.routes.login);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleGoogleSuccess = async (credential: string) => {
    try {
      const user = await loginWithGoogle(credential);
      dispatch(setUser(user));
      navigate(config.routes.home);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <RegisterContainer>
      <form onSubmit={handleSubmit}>
        <Top>
          <span>
            Have an account? <Link to='/login'>Login</Link>
          </span>
          <header>Sign Up</header>
        </Top>
        <TwoForms>
          <InputBox>
            <Icons.UserIcon white />
            <Input
              type='text'
              name='firstName'
              placeholder='Firstname'
              value={form.firstName}
              onChange={handleChange}
              required
            />
          </InputBox>
          <InputBox>
            <Icons.UserIcon white />
            <Input
              type='text'
              name='lastName'
              placeholder='Lastname'
              value={form.lastName}
              onChange={handleChange}
              required
            />
          </InputBox>
        </TwoForms>
        <InputBox>
          <Icons.EnvelopeIcon white />
          <Input
            type='email'
            name='email'
            placeholder='Email'
            value={form.email}
            onChange={handleChange}
            required
          />
        </InputBox>
        <InputBox>
          <Icons.LockIcon white />
          <Input
            type='password'
            name='password'
            placeholder='Password'
            value={form.password}
            onChange={handleChange}
            required
          />
        </InputBox>
        <InputBox>
          <Icons.UserIcon white />
          <input
            type='file'
            accept='image/*'
            onChange={(e) => {
              const file = e.target.files?.[0] || null;
              setForm((prev) => ({ ...prev, avatar: file }));
            }}
            style={{
              color: "#fff",
              fontSize: "14px",
              padding: "10px 0",
              border: "none",
              background: "transparent",
              flex: 1,
            }}
          />
        </InputBox>

        <Submit type='submit' value='Register' />
        <GoogleContainer>
          <GoogleAuthButton
            text='signup_with'
            onSuccess={handleGoogleSuccess}
          />
        </GoogleContainer>
        <TwoCol>
          <div className='one'></div>
          <div className='two'>
            <button type='button'>Terms & conditions</button>
          </div>
        </TwoCol>
      </form>
    </RegisterContainer>
  );
};

export default Register;

const RegisterContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 25%);
  width: 500px;
  display: flex;
  flex-direction: column;
  transition: 0.5s ease-in-out;
`;

const Top = styled.div`
  span {
    color: #fff;
    font-size: small;
    padding: 10px 0;
    display: flex;
    justify-content: center;

    a {
      font-weight: 500;
      color: #fff;
      margin-left: 5px;
      text-decoration: none;
      &:hover {
        text-decoration: underline;
      }
    }
  }

  header {
    color: #fff;
    font-size: 30px;
    text-align: center;
    padding: 10px 0 30px 0;
  }
`;

const TwoForms = styled.div`
  display: flex;
  gap: 10px;
`;

const InputBox = styled.div`
  display: flex;
  align-items: center;
  margin-bottom: 15px;
  background: rgba(255, 255, 255, 0.2);
  border-radius: 30px;
  padding: 0 10px;
`;

const Input = styled.input`
  font-size: 15px;
  background: transparent;
  height: 50px;
  width: 100%;
  border: none;
  border-radius: 30px;
  outline: none;
  transition: 0.2s ease;
  color: #ffffff;
  caret-color: #fff;

  &:-webkit-autofill,
  &:-webkit-autofill:hover,
  &:-webkit-autofill:focus,
  &:-webkit-autofill:active {
    -webkit-box-shadow: 0 0 0px 1000px transparent inset !important;
    -webkit-text-fill-color: #fff !important;
    transition: background-color 5000s ease-in-out 0s;
    background-color: transparent !important;
    box-shadow: 0 0 0px 1000px transparent inset !important;
  }
`;

const Submit = styled.input`
  font-size: 15px;
  font-weight: 500;
  color: black;
  height: 45px;
  width: 100%;
  border: none;
  border-radius: 30px;
  outline: none;
  background: rgba(255, 255, 255, 0.7);
  cursor: pointer;
  transition: 0.3s ease-in-out;

  &:hover {
    background: rgba(255, 255, 255, 0.5);
    box-shadow: 1px 5px 7px 1px rgba(0, 0, 0, 0.2);
  }
`;

const TwoCol = styled.div`
  display: flex;
  justify-content: space-between;
  color: #fff;
  font-size: small;
  margin-top: 10px;

  .one {
    display: flex;
    gap: 5px;
  }

  .two button {
    background: transparent;
    border: none;
    padding: 0;
    color: #fff;
    cursor: pointer;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const GoogleContainer = styled.div`
  width: 100%;
  height: 50px;
  margin-top: 15px;
  border-radius: 30px;
  overflow: hidden;

  display: flex;
  align-items: center;
  justify-content: center;

  background: rgba(255, 255, 255, 0.2);
`;