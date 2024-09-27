import styled from 'styled-components';

interface ButtonProps {
  blue?: boolean;
  orange?: boolean;
  white?: boolean;
  uppercase?: boolean;
  circle? : boolean;
  children: React.ReactNode;
}


const Button: React.FC<ButtonProps> = ({ children, ...props }) => {
  return (
    <StyledButton {...props}>
      {children}
    </StyledButton>
  );
};

export const StyledButton = styled.button<ButtonProps>`
  background-color: ${props =>
    props.blue ? '#37D4D9' :
    props.orange ? '#FF681A' :
    props.white ? '#ffffff' : 'black'};
  color: ${props =>
    props.blue || props.orange ? '#ffffff' : 
    props.white ? '#FF681A' : '#ffffff'};
  text-decoration: none;
  text-transform: ${props => props.uppercase ? 'uppercase' : 'normal'};
  text-align: center;
  font-weight: 700;
  font-size: 16px;
  line-height: 1;
  outline: 0;
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
  border-radius: ${props => props.circle ? '99px' : '10px'};
  border: none;
  vertical-align: middle;
  display: inline-block;
  padding: ${props => props.circle ? '0' : '15px 30px'};
  width: ${props => props.circle ? '50px' : 'undefined'};
  height: ${props => props.circle ? '50px' : 'undefined'};
  position: relative;
  z-index: 1;
  overflow: hidden;
  cursor: pointer;
  -webkit-transition: 0.3s all ease;
  transition: 0.3s ease all;

  &:hover {
    color: #FFF;
  }

  &:focus {
    color: #FFF;
  }

  &::before {
    -webkit-transition: 0.5s all ease;
    transition: 0.5s all ease;
    position: absolute;
    top: 0;
    left: 50%;
    right: 50%;
    bottom: 0;
    opacity: 0;
    content: '';
    background-color: #37D4D9;
    z-index: -2;
  }

  &:hover::before,
  &:focus::before {
    left: 0;
    right: 0;
    opacity: 1;
  }
`;

export default Button;
