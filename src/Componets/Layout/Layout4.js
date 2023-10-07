import React from 'react'
import NavTechnicanProfile from '../NavBar/navTechnicanProfile'

function Layout4 (props) {
  return (
   <React.Fragment>
    <NavTechnicanProfile/>
    <main>{props.children}</main>
   </React.Fragment>
  )
}

export default Layout4