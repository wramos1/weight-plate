import React from "react"
import Footer from "./Footer"
import Header from "./Header"


const Layout = ({ children }) => {
    return (
        <>
            <Header />
            <main className="pt-[7.5rem]">
                {children}
            </main>
            <Footer />
        </>
    )
}

export default Layout