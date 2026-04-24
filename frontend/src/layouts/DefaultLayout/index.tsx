import React, { ReactNode, useEffect, useState } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";
import styled from "styled-components";
import { useAutoLogoutOnLeave } from "../../Hooks/useAutoLogoutOnLeave";
import { logout, User } from "../../service/authService";




interface DefaultLayoutProps {
    children: ReactNode;
}


function DefaultLayout({ children }: DefaultLayoutProps): JSX.Element {
    const [user, setUser] = useState<User | null>(null);

    useAutoLogoutOnLeave(logout)
    useEffect(() => {
        const storedUser = localStorage.getItem('user');
        if (storedUser) {
            setUser(JSON.parse(storedUser));
        }
    }, []);
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
