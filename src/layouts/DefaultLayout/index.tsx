import React, { ReactNode } from "react";
import Header from "../components/Header";
import Footer from "../components/Footer";

interface DefaultLayoutProps {
    children: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps): JSX.Element {
    return (
        <>
            <Header />
            <div className="contain">{children}</div>
            <Footer />
        </>
    );
}

export default DefaultLayout;
