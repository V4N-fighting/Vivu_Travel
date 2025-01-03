import React, { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import styled from "styled-components";
import Navigation from "../components/Header/HeaderBottom/Navigation";
import HeaderBottom from "../components/Header/HeaderBottom";

interface HeaderOnlyProps {
    children: ReactNode;
}


function HeaderOnly({ children }: HeaderOnlyProps): JSX.Element {
    return (
        <Wrapper>
            <HeaderBottom />
            <div className="contain">{children}</div>
        </Wrapper>
    );
}

const Wrapper = styled.div`
    font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
    background: url("https://i.pinimg.com/1200x/a3/db/c5/a3dbc58d53001ecb1fbae836ab8e62a2.jpg");
    background-size: cover;
    background-repeat: no-repeat;
    background-attachment: fixed;
    overflow: hidden;
    height: 100vh;
    width: 100vw;

    .contain {
        position: relative;
    }
`

export default HeaderOnly;
