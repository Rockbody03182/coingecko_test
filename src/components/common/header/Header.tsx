import { Link, useLocation } from "react-router-dom";
import './header.css';

export default function Header() {
    const router = useLocation();
    return (
        <div className="header-menu">
            <Link className={`tab-box ${router.pathname === '/virtual' || router.pathname === '/' ? 'active' : 'disabled'}`} to={"/virtual"}>
                <h1>가상자산 시세 목록</h1>
            </Link>
            <Link className={`tab-box ${router.pathname === '/bookmark' ? 'active' : 'disabled'}`} to={"/bookmark"}>
                <h1>북마크 목록</h1>
            </Link>
        </div>
    )
}