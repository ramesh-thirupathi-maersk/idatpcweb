import React,{useEffect,useState} from 'react'

const Menu=()=>{
    return (
        <header className="main-header">
            <a href="" className="logo">    
                <span className="logo-mini"><b>I</b>DA</span>
                <span className="logo-lg"><b>TP changes</b></span>
            </a>
            <nav className="navbar navbar-static-top" role="navigation">
                <a href="#" className="sidebar-toggle" data-toggle="offcanvas" role="button">
                    <span className="sr-only"></span>
                </a>
                <div className="navbar-custom-menu">
                    <ul className="nav navbar-nav">
                    </ul>
                </div>
            </nav>
        </header>
    )
}

export default Menu