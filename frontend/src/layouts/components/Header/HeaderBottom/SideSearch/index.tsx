import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CloseButton from "../../../../../Component/BaseComponent/Button/CloseButton";
import { faMagnifyingGlass } from "@fortawesome/free-solid-svg-icons";
import { FontAwesomeIcon } from "@fortawesome/react-fontawesome";
import Icons from "../../../../../Component/BaseComponent/Icons";



interface SideSearchProps {
    onClose: () => void;
    isVisible: boolean;
}

const SideSearch: React.FC<SideSearchProps> = ({ onClose, isVisible }) => {
    const [isClosing, setIsClosing] = useState(false);

    useEffect(() => {
        if (isVisible) {
            setIsClosing(false);
        } else {
            setIsClosing(true);
            // Đảm bảo onClose chỉ được gọi sau khi hoạt ảnh đóng hoàn tất
            const timer = setTimeout(() => {
                onClose();
            }, 800); // Thời gian khớp với độ dài của hoạt ảnh

            // Cleanup khi component bị unmount hoặc trước khi gọi lại effect
            return () => clearTimeout(timer);
        }
    }, [isVisible, onClose]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 800); // Thời gian khớp với độ dài của hoạt ảnh
    };

    return (
        <SideSearchWrapper isVisible={isVisible} isClosing={isClosing}>
            <CloseButtonBox>
                <CloseButton onClick={handleClose} />
            </CloseButtonBox>
            <BoxSearch isVisible={isVisible}>
                <InputSearch placeholder="Search Here"/>
                <SearchIcon><Icons.SearchIcon /></SearchIcon>
            </BoxSearch>
        </SideSearchWrapper>
    );
}

const SideSearchWrapper = styled.div<{ isVisible: boolean; isClosing: boolean }>`
    position: fixed;
    z-index: 99999;
    left: ${props => (props.isClosing ? '-100%' : '0')};
    top: 0;
    height: 100%;
    width: ${props => (props.isClosing ? '0%' : '100%')};
    background-color: rgb(0, 0, 0);
    opacity: ${props => (props.isVisible ? '1' : '0')};
    visibility: ${props => (props.isVisible ? 'visible' : 'hidden')};
    transition: left 0.8s ease, opacity 0.8s ease, visibility 0.8s ease, width 0.8s ease;
`;

const CloseButtonBox = styled.div`
    display: flex;
    justify-content: end;
    position: absolute;
    top: 50px;
    right: 50px;
`;

const BoxSearch = styled.div<{ isVisible: boolean}>`
    position: absolute;
    top: 50%;
    left: 50%;
    display: inline-block;
    padding-bottom: 40px;
    cursor: auto;
    width: 100%;
    max-width: 700px;
    transform: translate(-50%, -50%) scale(${props => (props.isVisible ? '1' : '0')});
    transition: transform 0.4s ease, opacity 1.2s ease;
`;

const InputSearch = styled.input`
    font-size: 14px;
    height: 70px;
    width: 100%;
    border: 2px solid #FF681A;
    background-color: transparent;
    padding: 16px;
    padding-left: 30px;
    color: #fff;
    border-radius: 50px;
`;

const SearchIcon = styled.div`
    position: absolute;
    top: 0;
    background-color: transparent;
    border: none;
    font-size: 20px;
    right: 13px;
    color: #ffffff;
    cursor: pointer;
    width: 70px;
    height: 70px;
    transition: all 0.4s ease;
    transform: scale(1.001);
    display: flex;
    align-items: center;
    justify-content: center;
    transition: transform 0.4s ease;

    &:hover {
        transform: scale(1.2);
    }
`;

export default SideSearch;
