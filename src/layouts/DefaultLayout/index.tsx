import React, { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import styled from "styled-components";

interface DefaultLayoutProps {
    children: ReactNode;
}


function DefaultLayout({ children }: DefaultLayoutProps): JSX.Element {
    return (
        <Wrapper>
            <Header />
            <div className="contain">{children}</div>
            <Footer />
            <ScrollToTop />
        </Wrapper>
    );
}

const Wrapper = styled.div`
  font-family: system-ui, -apple-system, "Segoe UI", Roboto, "Helvetica Neue", Arial, "Noto Sans", "Liberation Sans", sans-serif, "Apple Color Emoji", "Segoe UI Emoji", "Segoe UI Symbol", "Noto Color Emoji";
`

export default DefaultLayout;
