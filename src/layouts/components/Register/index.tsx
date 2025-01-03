
import { faLock, faUser, faEnvelope } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import React from "react";
import { Link } from "react-router-dom";
import styled from "styled-components";



const Register: React.FC = () => {
  return (
    <RegisterContainer>
      <Top>
        <span>
          Have an account? <Link to='/login'>Login</Link>
        </span>
        <header>Sign Up</header>
      </Top>
      <TwoForms>
        <InputBox>
          <input type="text" placeholder="Firstname" />
          <Icon icon={faUser} />
        </InputBox>
        <InputBox>
          <input type="text" placeholder="Lastname" />
          <Icon icon={faUser} />
        </InputBox>
      </TwoForms>
      <InputBox>
        <input type="text" placeholder="Email" />
        <Icon icon={faEnvelope} />
      </InputBox>
      <InputBox>
        <input type="password" placeholder="Password" />
        <Icon icon={faLock} />
      </InputBox>
      <Submit type="submit" value="Register" />
      <TwoCol>
        <div className="one">
          <input type="checkbox" id="register-check" />
          <label htmlFor="register-check">Remember Me</label>
        </div>
        <div className="two">
          <a href="#">Terms & conditions</a>
        </div>
      </TwoCol>
    </RegisterContainer>
  );
};

const RegisterContainer = styled.div`
  position: absolute;
  left: 50%;
  transform: translate(-50%, 25%);
  width: 500px;
  display: flex;
  flex-direction: column;
  transition: 0.5s ease-in-out;
`;

const TwoForms = styled.div`
  display: flex;
  gap: 10px;
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

export default Register;