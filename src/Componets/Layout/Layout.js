import React from "react";
import Navbar from "../NavBar/navBar";
import Footer from "../Footer/footer";


function Layout(props){
    return(
        
        <React.Fragment>
            <Navbar />
            <main>{props.children}</main>
            {/* <Footer /> */}
        </React.Fragment>
    )
}

export default Layout;