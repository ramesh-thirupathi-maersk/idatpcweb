import React,{useEffect,useState} from 'react'

const year = new Date().getFullYear();
const Footer=()=>{
    return (
        <footer className="main-footer">
            <div className="footer-copyright text-center py-3">
                © {year} Copyright:
                Digital Automation
            </div>
        </footer>
    )
}
export default Footer;