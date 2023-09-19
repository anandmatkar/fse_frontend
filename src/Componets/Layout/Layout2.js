import React from "react";
import Footer from "../Footer/footer";
import ManagerNavigation from "../NavBar/navbarManager"


function LayoutManager(props){
    return(
        <React.Fragment>
            <ManagerNavigation />
            <main>{props.children}</main>
            <Footer />
        </React.Fragment>
    )
}

export default LayoutManager;