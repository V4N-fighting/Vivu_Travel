
import {  IconDefinition } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";



interface CircleIconBoxProps {
    rotate?: boolean;
    white?: boolean
}


interface CircleIconProps {
    onClick?: () => void;
    white?: boolean
    style?: React.CSSProperties;
    icon: IconDefinition;
}

const CircleIcon: React.FC<CircleIconProps> = ({ onClick, white, style, icon }) => {
    return (
        <CircleIconBox onClick={onClick} white={white} style={style}>
            <Icon icon={icon} />
        </CircleIconBox>
    );
}


const Icon = styled(FontAwesomeIcon)`
    width: 18px;
    height: 18px;
`;

const CircleIconBox = styled.div<CircleIconBoxProps>`
    margin: 0 10px 0 0;
    align-items: center;
    justify-content: center;
    display: flex;
    flex-shrink: 0;
    width: 50px;
    height: 50px;
    line-height: 50px;
    padding: 0;
    background-color:  ${props => props.white ? 'white' : 'var(--primary-color)'};
    color: ${props => props.white ? 'var(--primary-color)' : 'var(--white-color)'};;
    border: none;
    border-radius: 50%;
    transform: rotate(0);
    transform-origin: center;
    transition: all ease 0.4s;
    z-index: 33;
    cursor: pointer;
    text-align: center;

    &:hover {
        background-color: ${props => props.white ? 'white' : 'var(--secondary-color)'};
        transform: ${props => props.rotate ? 'rotate(90deg)' : 'rotate(0)'};
        color: ${props => props.white && 'var(--secondary-color)'}
    }
`;

export default CircleIcon;
