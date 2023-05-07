import "../Navbar.css";
import { RxHamburgerMenu } from 'react-icons/rx';
import { useState, useEffect } from 'react'

function Navbar () {
    
    const [collapse, setCollapse] = useState<boolean>(false)
    
    function handleClickA () {
        if (collapse == true) {
            setCollapse(!collapse)
        }
    }
    
    useEffect (() => {
        const query = 'min-width 600px'
        const media = window.matchMedia(query)
        if (media.matches !== collapse) {
            setCollapse(!media.matches);
        }
        const listener = () => setCollapse(media.matches)
        window.addEventListener('resize', listener)
    }, [collapse, '600px'])
    
    function handleCollapse () {
        setCollapse(!collapse)
    }
    
    return(<>
        <nav>
            <div className="title-zone">
            <a href="#" className="title-page">
                <div className="logo">LOGO</div>
                <div className="title-logo">
                    Fetching
                </div>
            </a>
            </div>
            
            <button onClick={handleCollapse} className="burger-menu">
                <RxHamburgerMenu size={25}/>
            </button>
            
            <ul className={!collapse ? "menu":'menu-collapse'}>
                <li ><a href="#section-news" onClick={handleClickA} className={!collapse ? "items":'items-collapse'}>News</a></li>
                <li ><a href="#section-favs" onClick={handleClickA} className={!collapse ? "items":'items-collapse'}>Favorites</a></li>
            </ul>
        </nav>
    </>);
}

export default Navbar;
