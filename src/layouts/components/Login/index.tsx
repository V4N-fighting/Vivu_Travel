// Login.tsx

import { faLock, faUser } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";
import Icons from "../../../Component/BaseComponent/Icons";



const Login: React.FC = () => {
  return (
    <LoginContainer>
      <Top>
        <span>
          Don&apos;t have an account? <Link to='/register'>Sign Up</Link>
        </span>
        <header>Login</header>
      </Top>
      <InputBox>
        <input type="text" placeholder="Username or Email" />
        <Icons.UserIcon />
      </InputBox>
      <InputBox>
        <input type="password" placeholder="Password" />
        <Icons.LockIcon />
      </InputBox>
      <Submit type="submit" value="Sign In" />
      <TwoCol>
        <div className="one">
          <input type="checkbox" id="login-check" />
          <label htmlFor="login-check">Remember Me</label>
        </div>
        <div className="two">
          <a href="#">Forgot password?</a>
        </div>
      </TwoCol>
    </LoginContainer>
  );
};

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
  position: relative;
  margin-bottom: 15px;

  input {
    font-size: 15px;
    background: rgba(255, 255, 255, 0.2);
    color: #fff;
    height: 50px;
    width: 100%;
    padding: 0 10px 0 45px;
    border: none;
    border-radius: 30px;
    outline: none;
    transition: 0.2s ease;

    &:hover,
    &:focus {
      background: rgba(255, 255, 255, 0.25);
    }
  }

  i {
    position: absolute;
    top: 50%;
    left: 17px;
    transform: translateY(-50%);
    color: #fff;
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

    input {
      margin-right: 5px;
    }
  }

  .two a {
    text-decoration: none;
    color: #fff;

    &:hover {
      text-decoration: underline;
    }
  }
`;

const Icon = styled(FontAwesomeIcon)`
    font-size: 15px;
    position: absolute;
    top: 50%;
    left: 17px;
    transform: translateY(-50%);
    color: #fff;
`

export default Login;
