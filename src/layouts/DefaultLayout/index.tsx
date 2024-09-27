import React, { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";
import ScrollToTop from "../components/ScrollToTop";

interface DefaultLayoutProps {
    children: ReactNode;
}


function DefaultLayout({ children }: DefaultLayoutProps): JSX.Element {
    return (
        <>
            <Header />
            <div className="contain">{children}</div>
            <Footer />
            <ScrollToTop />
        </>
    );
}

export default DefaultLayout;
