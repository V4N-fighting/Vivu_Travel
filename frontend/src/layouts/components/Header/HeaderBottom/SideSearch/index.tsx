import React, { useState, useEffect } from "react";
import styled from "styled-components";
import CloseButton from "../../../../../Component/BaseComponent/Button/CloseButton";
import Icons from "../../../../../Component/BaseComponent/Icons";
import { useNavigate } from "react-router-dom";

interface SideSearchProps {
    onClose: () => void;
    isVisible: boolean;
}

const SideSearch: React.FC<SideSearchProps> = ({ onClose, isVisible }) => {
    const [isClosing, setIsClosing] = useState(false);
    const [query, setQuery] = useState("");
    const navigate = useNavigate();

    useEffect(() => {
        if (isVisible) {
            setIsClosing(false);
            setQuery(""); // Clear input when opened
        } else {
            setIsClosing(true);
        }
    }, [isVisible]);

    const handleClose = () => {
        setIsClosing(true);
        setTimeout(() => {
            onClose();
        }, 400); // Wait for fade-out transition
    };

    const handleSearch = () => {
        if (query.trim()) {
            navigate(`/trips?searchText=${encodeURIComponent(query.trim())}`);
            handleClose();
        }
    };

    const handleKeyDown = (e: React.KeyboardEvent<HTMLInputElement>) => {
        if (e.key === "Enter") {
            handleSearch();
        }
    };

    const handleSuggestionClick = (destination: string) => {
        navigate(`/trips?destination=${encodeURIComponent(destination)}`);
        handleClose();
    };

    return (
        <SideSearchWrapper isVisible={isVisible} isClosing={isClosing}>
            <CloseButtonBox>
                <CloseButton onClick={handleClose} />
            </CloseButtonBox>
            <BoxSearch isVisible={isVisible && !isClosing}>
                <SearchTitle>Bạn muốn đi du lịch ở đâu?</SearchTitle>
                <SearchInputContainer>
                    <InputSearch 
                        placeholder="Nhập tên tour, điểm đến hoặc hoạt động..." 
                        value={query}
                        onChange={(e) => setQuery(e.target.value)}
                        onKeyDown={handleKeyDown}
                        autoFocus
                    />
                    <SearchIcon onClick={handleSearch}>
                        <Icons.SearchIcon />
                    </SearchIcon>
                </SearchInputContainer>
                <SearchSuggestions>
                    <SuggestionLabel>Gợi ý:</SuggestionLabel>
                    <SuggestionLink onClick={() => handleSuggestionClick("Hội An")}>Hội An</SuggestionLink>
                    <SuggestionLink onClick={() => handleSuggestionClick("Đà Nẵng")}>Đà Nẵng</SuggestionLink>
                    <SuggestionLink onClick={() => handleSuggestionClick("Hạ Long")}>Hạ Long</SuggestionLink>
                    <SuggestionLink onClick={() => handleSuggestionClick("Phú Quốc")}>Phú Quốc</SuggestionLink>
                    <SuggestionLink onClick={() => handleSuggestionClick("Sapa")}>Sapa</SuggestionLink>
                </SearchSuggestions>
            </BoxSearch>
        </SideSearchWrapper>
    );
};

const SideSearchWrapper = styled.div<{ isVisible: boolean; isClosing: boolean }>`
    position: fixed;
    z-index: 99999;
    left: 0;
    top: 0;
    height: 100%;
    width: 100%;
    background-color: rgba(15, 23, 42, 0.88); /* Modern slate dark background */
    backdrop-filter: blur(20px);
    opacity: ${props => (props.isVisible && !props.isClosing ? '1' : '0')};
    visibility: ${props => (props.isVisible && !props.isClosing ? 'visible' : 'hidden')};
    transition: opacity 0.4s ease-in-out, visibility 0.4s ease-in-out;
`;

const CloseButtonBox = styled.div`
    display: flex;
    justify-content: end;
    position: absolute;
    top: 50px;
    right: 50px;
    z-index: 100000;
`;

const BoxSearch = styled.div<{ isVisible: boolean }>`
    position: absolute;
    top: 45%;
    left: 50%;
    transform: translate(-50%, -50%) scale(${props => (props.isVisible ? '1' : '0.9')});
    opacity: ${props => (props.isVisible ? '1' : '0')};
    width: 90%;
    max-width: 800px;
    display: flex;
    flex-direction: column;
    align-items: center;
    gap: 30px;
    transition: transform 0.4s cubic-bezier(0.34, 1.56, 0.64, 1), opacity 0.4s ease-in-out;
`;

const SearchTitle = styled.h2`
    font-size: 30px;
    font-weight: 800;
    color: #ffffff;
    margin: 0;
    text-transform: uppercase;
    letter-spacing: 1px;
    font-family: system-ui, -apple-system, sans-serif;
    text-align: center;
    text-shadow: 0 4px 10px rgba(0, 0, 0, 0.2);
`;

const SearchInputContainer = styled.div`
    position: relative;
    width: 100%;
    box-shadow: 0 15px 35px rgba(0, 0, 0, 0.3);
    border-radius: 50px;
`;

const InputSearch = styled.input`
    font-size: 20px;
    font-weight: 500;
    height: 80px;
    width: 100%;
    border: 2px solid #FF681A;
    background-color: rgba(255, 255, 255, 0.05);
    padding: 16px 80px 16px 35px;
    color: #ffffff;
    border-radius: 50px;
    font-family: system-ui, -apple-system, sans-serif;
    outline: none;
    transition: all 0.3s ease;

    &:focus {
        background-color: rgba(255, 255, 255, 0.1);
        border-color: #ff853f;
        box-shadow: 0 0 20px rgba(255, 104, 26, 0.4);
    }
`;

const SearchIcon = styled.div`
    position: absolute;
    top: 50%;
    transform: translateY(-50%);
    background-color: transparent;
    border: none;
    font-size: 24px;
    right: 25px;
    color: #FF681A;
    cursor: pointer;
    display: flex;
    align-items: center;
    justify-content: center;
    transition: all 0.3s ease;

    &:hover {
        color: #ffffff;
        transform: translateY(-50%) scale(1.1);
    }
`;

const SearchSuggestions = styled.div`
    display: flex;
    align-items: center;
    justify-content: center;
    flex-wrap: wrap;
    gap: 12px;
    font-family: system-ui, -apple-system, sans-serif;
`;

const SuggestionLabel = styled.span`
    color: rgba(255, 255, 255, 0.6);
    font-size: 15px;
    font-weight: 500;
`;

const SuggestionLink = styled.span`
    color: #ffffff;
    font-size: 14px;
    font-weight: 600;
    background-color: rgba(255, 255, 255, 0.1);
    padding: 8px 18px;
    border-radius: 50px;
    cursor: pointer;
    transition: all 0.3s ease;
    border: 1px solid rgba(255, 255, 255, 0.1);

    &:hover {
        background-color: #FF681A;
        border-color: #FF681A;
        transform: translateY(-2px);
        box-shadow: 0 5px 15px rgba(255, 104, 26, 0.4);
    }
`;

export default SideSearch;
