import { faXmark } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import styled from "styled-components";

// Define the type for the styled Icon component
const Icon = styled(FontAwesomeIcon)`
    width: 24px;
    height: 24px;
`;

// Define the props type for the CloseButtonBox component
interface CloseButtonBoxProps {
    rotate?: boolean;
}

const CloseButtonBox = styled.div<CloseButtonBoxProps>`
    align-items: center;
    justify-content: center;
    display: flex;
    width: 50px;
    height: 50px;
    line-height: 50px;
    padding: 0;
    background-color: #FF681A;
    color: #ffffff;
    border: none;
    border-radius: 50%;
    transform: rotate(0);
    transform-origin: center;
    transition: all ease 0.4s;
    z-index: 33;
    cursor: pointer;
    text-align: center;

    &:hover {
        background-color: #37d4d9;
        transform: ${props => props.rotate && 'rotate(90deg)'};
    }
`;

// Define the props type for the CloseButton component
interface CloseButtonProps {
    onClick: () => void;
}

function CloseButton({ onClick }: CloseButtonProps) {
    return (
        <CloseButtonBox rotate onClick={onClick}>
            <Icon icon={faXmark} />
        </CloseButtonBox>
    );
}

export default CloseButton;
