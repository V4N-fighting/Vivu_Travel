import React, { useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import styled from "styled-components";
import Icons from "../../Component/BaseComponent/Icons";
import GoogleAuthButton from "../../Component/GoogleAuthButton";
import { login, loginWithGoogle } from "../../service/authService";
import config from "../../config";
import { useDispatch } from "react-redux";
import { AppDispatch } from "../../app/store";
import { setUser } from "../../features/user/userSlice";

interface LoginForm {
  email: string;
  password: string;
  rememberMe: boolean;
}

const Login: React.FC = () => {
  const [form, setForm] = useState<LoginForm>({
    email: "",
    password: "",
    rememberMe: false,
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

  const finishLogin = (user: any) => {
    dispatch(setUser(user));

    if (user?.role === "admin") {
      window.location.href = "/admin/dashboard";
    } else {
      navigate(config.routes.home);
    }
  };

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      const user = await login(form.email, form.password);
      localStorage.setItem("rememberMe", JSON.stringify(form.rememberMe));
      finishLogin(user);
    } catch (err: any) {
      alert(err.message);
    }
  };

  const handleGoogleSuccess = async (credential: string) => {
    try {
      const user = await loginWithGoogle(credential);
      localStorage.setItem("rememberMe", JSON.stringify(form.rememberMe));
      finishLogin(user);
    } catch (err: any) {
      alert(err.message);
    }
  };

  return (
    <LoginContainer>
      <form onSubmit={handleSubmit}>
        <Top>
          <span>
            Don&apos;t have an account? <Link to={config.routes.register}>Sign Up</Link>
          </span>
          <header>Login</header>
        </Top>
        <InputBox>
          <Icons.UserIcon white />
          <Input
            type='text'
            name='email'
            placeholder='Username or Email'
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
        <Submit type='submit' value='Sign In' />
        <GoogleContainer>
          <GoogleAuthButton onSuccess={handleGoogleSuccess} />
        </GoogleContainer>
        <TwoCol>
          <div className='one'>
            <input
              type='checkbox'
              id='login-check'
              name='rememberMe'
              checked={form.rememberMe}
              onChange={handleChange}
            />
            <label htmlFor='login-check'>Remember Me</label>
          </div>
          <div className='two'>
            <button type='button'>Forgot password?</button>
          </div>
        </TwoCol>
      </form>
    </LoginContainer>
  );
};

export default Login;

const LoginContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 50%);
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
    text-decoration: none;
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
