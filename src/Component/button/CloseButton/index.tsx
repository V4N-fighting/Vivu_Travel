import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";



// Define the props type for the CloseButtonBox component
interface CloseButtonBoxProps {
    rotate?: boolean;
    white?: boolean

}



// Define the props type for the CloseButton component
interface CloseButtonProps {
    onClick?: () => void;
    white?: boolean
    style?: React.CSSProperties;
}

const CloseButton: React.FC<CloseButtonProps> = ({ onClick, white, style }) => {
    return (
        <CloseButtonBox rotate onClick={onClick} white={white} style={style}>
            <Icon icon={faXmark} />
        </CloseButtonBox>
    );
}

// Define the type for the styled Icon component
const Icon = styled(FontAwesomeIcon)`
    width: 24px;
    height: 24px;
`;

const CloseButtonBox = styled.div<CloseButtonBoxProps>`
    align-items: center;
    justify-content: center;
    display: flex;
    width: 50px;
    height: 50px;
    line-height: 50px;
    padding: 0;
    background-color:  ${props => props.white ? 'white' : '#FF681A'};
    color: ${props => props.white ? '#FF681A' : '#ffffff'};;
    border: none;
    border-radius: 50%;
    transform: rotate(0);
    transform-origin: center;
    transition: all ease 0.4s;
    z-index: 33;
    cursor: pointer;
    text-align: center;

    &:hover {
        background-color: ${props => props.white ? 'white' : '#37d4d9'};
        transform: ${props => props.rotate ? 'rotate(90deg)' : 'rotate(0)'};
        color: ${props => props.white && '#37d4d9'}
    }
`;

export default CloseButton;
