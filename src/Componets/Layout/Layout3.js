import React from "react";
import TechNavigation from "../NavBar/navTechnician";


function LayoutTech(props){
    return(
        <React.Fragment>
            <TechNavigation/>
            <main>{props.children}</main>
        </React.Fragment>
    )
}

export default LayoutTech;