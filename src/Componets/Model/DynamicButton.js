import React from "react";

function DynamicButton(props){
    return(
        <button onClick={props.onClick}>
            <span>Click Here!</span>
            {/* <span>{numberOfProject}</span> */}
        </button>
    )
}

export default DynamicButton;
