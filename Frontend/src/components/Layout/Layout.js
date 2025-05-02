import React from "react";
import Footer from "./Footer";
import Header from "./Header";

const Layout = ({ children }) => {
    const layoutStyles = {
        display: "flex",
        flexDirection: "column",
        minHeight: "100vh",
    };

    const contentStyles = {
        flex: 1,
    };

    const footerStyles = {
        flexShrink: 0,
        padding: "20px",
        backgroundColor: "#333",
        color: "white",
        textAlign: "center",
    };

    return (
        <div style={layoutStyles}>
            <Header />
            <div style={contentStyles}>{children}</div>
            {/* <Footer style={footerStyles} /> */}
        </div>
    );
};

export default Layout;
