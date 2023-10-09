import React from "react";
import Navbar from "../NavBar/AdminNavBar";
import Footer from "../Footer/footer";
import MainNavigation from "../NavBar/navBar";


function Layout(props){
    return(
        
        <React.Fragment>
            <MainNavigation />
            <main>{props.children}</main>
            {/* <Footer /> */}
        </React.Fragment>
    )
}

export default Layout;