import React, { ReactNode } from "react";
import Header from "../components/Header";

interface DefaultLayoutProps {
    children: ReactNode;
}

function DefaultLayout({ children }: DefaultLayoutProps): JSX.Element {
    return (
        <>
            <Header />
            <div className="contain">{children}</div>
            <div className="footer"></div>
        </>
    );
}

export default DefaultLayout;
