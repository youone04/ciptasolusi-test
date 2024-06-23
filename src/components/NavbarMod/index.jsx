
import { Link } from 'react-router-dom';

export default function NavbarMod() {
    return (
        <nav id='menu'>
            <ul>
                <li><Link to='/'>Home</Link></li>
                <li><Link to='/dashboard'>Dashboard</Link></li>
            </ul>
        </nav>
    )
}