import { Link, useLocation } from "react-router-dom";
import './Navbar.css'

function Navbar() {
    const location = useLocation();

    return (
        <nav className="site-nav">
            <div className="site-nav__container">

                <Link className="site-nav__brand" to="/">
                    <img
                        src="/logo.png"
                        alt="Logo"
                        className="site-nav__logo"
                    />
                    Designer C.
                </Link>

                <ul className="site-nav__links">
                    <li><Link className={`site-nav__link ${location.pathname === '/' ? 'site-nav__link--active' : ''}`} to="/">Home</Link></li>
                    <li><Link className={`site-nav__link ${location.pathname === '/works' ? 'site-nav__link--active' : ''}`} to="/works">Works</Link></li>
                    <li><Link className={`site-nav__link ${location.pathname === '/services' ? 'site-nav__link--active' : ''}`} to="/services">Services</Link></li>
                    <li><Link className={`site-nav__link ${location.pathname === '/contact' ? 'site-nav__link--active' : ''}`} to="/contact">Contact</Link></li>
                </ul>

            </div>
        </nav>
    );
}

export default Navbar;