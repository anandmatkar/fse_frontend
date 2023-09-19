import React,{Fragment} from "react";
import { ReactDOM } from "react";
import classes from "Modal.module.css";
function Backdrop(props){
    return <div className={classes.backdrop} onClick={props.onClose}></div>
}

function ModalOverlay(props){
    return (
        <div className={classes.modal}> 
            <div className={classes.content}>
                {props.children}
            </div>
        </div>
    )
}
const portalhelper = document.getElementById("overlays")

function Modal(props){
    return(
        <Fragment>
            {ReactDOM.createPortal(<Backdrop onClose={props.onClose} />,portalhelper)}
            {ReactDOM.createPortal(
                <ModalOverlay>{props.children}</ModalOverlay>,
                portalhelper
            )}
        </Fragment>
    );

}

export default Modal;